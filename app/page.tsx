// app/page.tsx (temporary)
import { BlogAPI } from '@/lib/blog-api';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogHeader } from '@/components/blog/header';
import { BlogFooter } from '@/components/blog/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevBlog - Professional Developer Insights & Tutorials',
  description: 'Discover the latest in web development, programming tutorials, and technology insights from experienced developers.',
  metadataBase: new URL('http://localhost:3000'),
};

export default async function HomePage() {
  const { posts, total, hasMore } = await BlogAPI.getPosts(1, 12);

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      
      <main className="flex-1">
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">DevBlog</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Professional insights and tutorials
            </p>
            <p>{total} articles published</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <BlogGrid 
              initialPosts={posts} 
              initialTotal={total} 
              initialHasMore={hasMore} 
            />
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
}