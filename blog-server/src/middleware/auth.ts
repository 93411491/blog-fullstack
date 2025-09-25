import { Context, Next } from "koa";
import { redisClient } from "../config/redis";

interface SessionUser {
  username: string;
  userId: string;
}

declare module "koa" {
  interface DefaultState {
    user?: SessionUser;
  }
}

export const isAuthenticated = async (ctx: Context, next: Next) => {
  const sessionId = ctx.cookies.get("sessionId");
  if (!sessionId) {
    ctx.status = 401;
    ctx.body = {
      msg: "Authentication required. Please log in.",
    };
    console.warn("Authentication required. Please log in.");
    return;
  }
  try {
    const sessionData = await redisClient.get(`SESSION:${sessionId}`);
    if (!sessionData) {
      ctx.status = 401;
      ctx.body = "Session expired or invalid. Please log in again.";
      console.warn("Session expired or invalid. Please log in again.");
      return;
    }
    ctx.state.user = JSON.parse(sessionData) as SessionUser;
    await next();
  } catch (error) {
    console.error(`auth middleware error,${error}`);
    ctx.status = 500;
    ctx.body = { message: "An internal error occurred." };
  }
};
