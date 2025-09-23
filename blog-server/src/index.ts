import Koa from "koa";
import cors from "@koa/cors";
import parser from "koa-bodyparser";
import UserRouter from "./routes/users";
import PostRouter from "./routes/posts";
import connectDB from "./config/db";
import { connectRedis } from "./config/redis";

connectDB();
connectRedis();

const app = new Koa();
const PORT = 3001;

app.use(cors());
app.use(parser());

app.use(UserRouter.routes());
app.use(UserRouter.allowedMethods());

app.use(PostRouter.routes());
app.use(PostRouter.allowedMethods());

app.use(async (ctx) => {
  if (ctx.path === "/") {
    ctx.body = "welcome to the blog api";
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
