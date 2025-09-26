import { Context } from "vm";
import Post from "../models/Post";

export const getAllPosts = async (ctx: Context) => {
  try {
    const posts =await Post.find()
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

export const getPostById = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const post = await Post.findById(id).populate("author", "username");

    if (!post) {
      ctx.status = 404;
      ctx.body = { msg: "Post not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = post;
    console.log("博客详情获取 success");
  } catch (error) {
    console.error("Error fetching post:", error);
    ctx.status = 500;
    ctx.body = { message: "An error occurred while fetching the post." };
  }
};

export const createPost = async (ctx: Context) => {
  try {
    console.log("createPost start");
    const { title, content } = ctx.request.body as {
      title: string;
      content: string;
    };

    if (!title || !content) {
      ctx.status = 400;
      ctx.body = { message: "Title and content are required." };
      console.warn("Title and content are required.");
      return;
    }

    const authorId = ctx.state.user?.userId;
    if (!authorId) {
      ctx.status = 400;
      ctx.body = { msg: "User information is missing" };
      console.warn("User information is missing");
      return;
    }
    const newPost = new Post({
      title,
      content,
      author: authorId,
    });
    await newPost.save();
    ctx.status = 201;
    ctx.body = newPost;
    console.log("createPost success");
  } catch (error) {
    console.error("Error creating post:", error);
    ctx.status = 500;
    ctx.body = { message: "An error occurred while creating the post." };
  }
};
