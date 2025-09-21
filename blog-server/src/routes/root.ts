import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "this is root blog api";
});

export default router;
