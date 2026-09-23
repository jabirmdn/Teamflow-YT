import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { base } from "./base";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const requiredAuthMiddleware = base
  .$context<{
    session?: { user?: KindeUser<Record<string, unknown>> | null };
  }>()
  .middleware(async ({ context, next, errors }) => {
    const session = context.session ?? (await getSession());
    if (!session.user) {
      throw errors.UNAUTHORIZED();
    }
    return next({
      context: { user: session.user },
    });
  });

const getSession = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return {
    user,
  };
};
