import Router from "koa-router";
import { getAllPosts } from "../controllers/postController";

const router = new Router();

router.prefix("/api/posts");

router.get("/", getAllPosts);

export default router;
