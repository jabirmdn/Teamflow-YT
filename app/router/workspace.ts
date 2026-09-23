import { os } from "@orpc/server";
import { openapi } from "@orpc/openapi";
import { z } from "zod";
import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { base } from "../middleware/base";
import { requiredAuthMiddleware } from "../middleware/auth";
import { requiredWorkspaceMiddleware } from "../middleware/workspace";
import { workspaceSchema } from "../schemas/workspace";
import { init, Organizations } from "@kinde/management-api-js";

export const listWorkspaces = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .meta(
    openapi({
      method: "GET",
      path: "/workspace",
      summary: "list all workspaces",
      tags: ["workspace"],
    }),
  )
  .input(z.void())
  .output(
    z.object({
      workspaces: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string(),
        }),
      ),
      user: z.custom<KindeUser<Record<string, unknown>>>(),
      currentWorkspace: z.custom<KindeOrganization<unknown>>(),
    }),
  )
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();
    const organizations = await getUserOrganizations();
    if (!organizations) {
      throw errors.FORBIDDEN();
    }
    return {
      workspaces: organizations?.orgs.map((org) => ({
        id: org.code,
        name: org.name ?? "My workspace",
        avatar: org.name?.charAt(0) ?? "M",
      })),
      user: context.user,
      currentWorkspace: context.workspace,
    };
  });

export const createWorkspace = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .meta(
    openapi({
      method: "POST",
      path: "/workspace",
      summary: "create a new workspace",
      tags: ["workspace"],
    }),
  )
  .input(workspaceSchema)
  .output(
    z.object({
      orgCode: z.string(),
      workspaceName: z.string(),
    }),
  )
  .handler(async ({ input, context, errors }) => {
    init();
    let data;
    try {
      data = await Organizations.createOrganization({
        body: { name: input.name },
      });
    } catch {
      throw errors.FORBIDDEN();
    }

    if (!data?.organization?.code) {
      throw errors.FORBIDDEN();
    }

    try {
      await Organizations.addOrganizationUsers({
        path: { org_code: data.organization.code },
        body: {
          users: [
            {
              id: context.user.id,
              roles: ["admin"],
            },
          ],
        },
      });
    } catch {
      throw errors.FORBIDDEN();
    }

    const { refreshTokens } = getKindeServerSession();
    await refreshTokens();
    return {
      orgCode: data.organization.code,
      workspaceName: input.name,
    };
  });
