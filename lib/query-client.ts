import { RPCJsonSerializer } from "@orpc/client";
import {
  environmentManager,
  hashKey,
  QueryClient,
} from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

/**
 * A fresh query client per request on the server, a shared singleton in the browser.
 */
export function getQueryClient(): QueryClient {
  if (environmentManager.isServer()) {
    return createQueryClient();
  }

  browserQueryClient ??= createQueryClient();
  return browserQueryClient;
}

const serializer = new RPCJsonSerializer();

function createQueryClient(): QueryClient {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount

        queryKeyHashFn: (queryKey) => {
          const { json, meta } = serializer.serialize(queryKey);

          return hashKey([
            json,
            meta?.map((entry) => JSON.stringify(entry)).sort(),
          ]);
        },
      },
      dehydrate: {
        serializeData: (data) => {
          const { json, meta } = serializer.serialize(data);
          return { json, meta };
        },
      },
      hydrate: {
        deserializeData(data) {
          return serializer.deserialize(data);
        },
      },
    },
  });

  if (environmentManager.isServer()) {
    cancelStreamsOnSuccess(queryClient);
  }

  return queryClient;
}

/**
 * Streamed and live queries can stay open indefinitely and would block SSR
 * forever. Only active streams hold `success` status while still `fetching`,
 * so silently cancel queries in that state: the data received so far is kept,
 * prefetching settles, and dehydration works as usual.
 *
 * Server-side query clients only. In the browser this would cancel active
 * streams and background refetches.
 */
function cancelStreamsOnSuccess(queryClient: QueryClient): void {
  const cancelled = new Set<string>();

  queryClient.getQueryCache().subscribe(({ query }) => {
    if (
      query.state.status !== "success" || // no successful snapshot yet
      query.state.fetchStatus !== "fetching" || // already settled
      cancelled.has(query.queryHash)
    ) {
      return;
    }

    cancelled.add(query.queryHash);
    void query.cancel({ silent: true });
  });
}
