'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/posts', 
        { title, content },
        { withCredentials: true } // ★★★ 关键配置: 确保发送 Cookie
      );

      if (response.status === 201) {
        setSuccess('Post created successfully! Redirecting to home...');
        setTimeout(() => {
          router.push('/'); // 发布成功后跳转到首页
        }, 2000);
      }
    } catch (err: any) {
      console.error('Failed to create post:', err);
      if (axios.isAxiosError(err) && err.response) {
        // 特别处理 401 未授权错误
        if (err.response.status === 401) {
          setError('You must be logged in to create a post. Redirecting to login...');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setError(err.response.data.message || 'An unexpected error occurred.');
        }
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <Link href="/" style={{ color: 'blue', marginBottom: '20px', display: 'block' }}>
        &larr; Back to Home
      </Link>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', fontSize: '1.2em' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            style={{ width: '100%', padding: '8px', marginTop: '5px', fontSize: '1em', fontFamily: 'sans-serif' }}
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        
        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px' }}>
          {isLoading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}
