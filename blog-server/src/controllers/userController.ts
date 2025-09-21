import { Context } from "koa";
import User from "../models/user";
import bcrypt from "bcryptjs"

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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    const newUser = new User({
        username : username,
        password : hashedPassword
    })

    await newUser.save();

    ctx.status = 201;
    ctx.body = {
        message : 'User registered successfully',
        user : {
            id : newUser._id,
            username : newUser.username
        }
    }


  } catch (error) {}
};
