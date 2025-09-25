import Koa from "koa";
import cors from "@koa/cors";
import parser from "koa-bodyparser";
import userRouter from "./routes/users";
import postRouter from './routes/posts';
import connectDB from "./config/db";
import { connectRedis } from "./config/redis";

connectDB();
connectRedis();

const app = new Koa();
const PORT = 3001;

// --- 更新 CORS 配置 ---
app.use(cors({
  origin: 'http://localhost:3000', // 1. 明确允许的前端源
  credentials: true,             // 2. 允许请求携带 Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 允许的头部
}));

app.use(parser());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(postRouter.routes());
app.use(postRouter.allowedMethods());

app.use(async (ctx) => {
  if (ctx.path === "/") {
    ctx.body = "welcome to the blog api";
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
