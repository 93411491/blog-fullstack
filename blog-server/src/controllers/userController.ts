import { Context } from "koa";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../config/redis";

export const register = async (ctx: Context) => {
  try {
    const { username, password } = ctx.request.body as {
      [key: string]: string;
    };
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = {
        message: `username and password are required`,
      };
      return;
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      ctx.status = 409;
      ctx.body = { message: `Username already exist` };
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    ctx.status = 201;
    ctx.body = {
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    ctx.status = 500;
    ctx.body = { message: "An error occurred during registration." };
  }
};

export const login = async (ctx: Context) => {
  try {
    const { username, password } = ctx.request.body as {
      [key: string]: string;
    };
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = { message: "username and password is required" };
      console.warn("username and password is required");
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      ctx.status = 400;
      ctx.body = { msg: "invalid username" };
      console.warn("invalid username");
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      ctx.status = 401;
      ctx.body = { msg: "invalid username or password" };
      console.warn();
      return;
    }
    const sessionId = uuidv4();
    const sessionData = JSON.stringify({
      userId: user._id,
      username: user.username,
    });

    await redisClient.set(`SESSION:${sessionId}`, sessionData, {
      EX: 24 * 60 * 60, // 24小时
    });
    ctx.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1_000,
    });
    ctx.status = 200;
    ctx.body = {
      message: "Logged in Success",
      user: {
        id: user._id,
        username: user.username,
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { msg: "An error occurred during login." };
    console.error(`An error occurred during login. ${error}`);
  }
};
