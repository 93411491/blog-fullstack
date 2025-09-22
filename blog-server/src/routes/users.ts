import Router from "koa-router";
import { login, register } from "../controllers/userController";

const router = new Router();

router.prefix("/api/users");

router.post("/register", register);

router.post("/login", login);

export default router;
