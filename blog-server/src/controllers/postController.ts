import { Context } from "vm";
import Post from "../models/Post";

export const getAllPosts = async (ctx: Context) => {
  try {
    const posts = Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");
    ctx.status = 200;
    ctx.body = posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    ctx.status = 500;
    ctx.body = { message: "An error occurred while fetching posts." };
  }
};
