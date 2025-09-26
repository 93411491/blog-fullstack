import type { Metadata } from "next";
import Link from 'next/link';
import "./globals.css";

export const metadata: Metadata = {
  title: "My Full-Stack Blog",
  description: "A blog project built with Next.js and Koa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none', color: 'black' }}>
            MyBlog
          </Link>
          <div>
            <Link href="/posts/create" style={{ marginRight: '1rem', color: 'blue' }}>
              Create Post
            </Link>
            <Link href="/login" style={{ marginRight: '1rem' }}>
              Login
            </Link>
            <Link href="/register">
              Register
            </Link>
          </div>
        </nav>
        <main style={{
          maxWidth: '800px',
          margin: '2rem auto',
          padding: '0 1rem'
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
