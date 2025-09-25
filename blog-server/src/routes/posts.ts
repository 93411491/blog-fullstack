import Router from "koa-router";
import { createPost, getAllPosts } from "../controllers/postController";
import { isAuthenticated } from "../middleware/auth";

const router = new Router();

router.prefix("/api/posts");

router.get("/", getAllPosts);

router.post("/", isAuthenticated, createPost);

export default router;
