"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

export default function PostDataPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams(); // 获取动态路由参数
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `http://localhost:3001/api/posts/${id}`
          );
          setPost(response.data);
        } catch (err: any) {
          console.error("Failed to fetch post:", err);
          if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.message || "Failed to load post.");
          } else {
            setError("An unknown error occurred.");
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]); // 当 id 发生变化时，重新获取数据

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Post not found.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <Link
        href="/"
        style={{ color: "blue", marginBottom: "20px", display: "block" }}
      >
        &larr; Back to Home
      </Link>
      <article>
        <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
          {post.title}
        </h1>
        <div style={{ color: "#555", marginBottom: "30px" }}>
          <span>By {post.author.username}</span> |
          <span>
            {" "}
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div
          style={{
            fontSize: "1.2em",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </div>
      </article>
    </div>
  );
}
