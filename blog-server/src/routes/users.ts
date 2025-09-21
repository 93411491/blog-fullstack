import Router from "koa-router";
import { register } from "../controllers/userController";

const router = new Router();

router.prefix("/api/users");

router.post("/register", register);

router.post("/login", async (ctx) => {
  const body = ctx.request.body;
  console.log(`Login user with data: ${JSON.stringify(body)}`);
  ctx.body = {
    message: "user login endpoint",
    data: body,
  };
});

export default router;
