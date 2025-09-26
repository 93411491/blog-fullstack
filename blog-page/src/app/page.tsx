'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// 定义文章列表项的数据结构
interface PostSummary {
  _id: string;
  title: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Could not load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // 空依赖数组，表示只在组件首次加载时运行一次

  return (
    <div>
      <h1 style={{ fontSize: '2.5em', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        Latest Posts
      </h1>

      {isLoading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!isLoading && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.length > 0 ? (
            posts.map(post => (
              <li key={post._id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <Link href={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h2 style={{ fontSize: '1.8em', marginBottom: '10px', color: '#333' }}>
                    {post.title}
                  </h2>
                  <div style={{ color: '#666', fontSize: '0.9em' }}>
                    <span>By {post.author.username}</span> | 
                    <span> Published on {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>No posts found. Why not create one?</p>
          )}
        </ul>
      )}
    </div>
  );
}
