import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { BlogAPI } from '@/lib/blog-api';
import { BlogHeader } from '@/components/blog/header';
import { BlogFooter } from '@/components/blog/footer';
import { MarkdownRenderer } from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await BlogAPI.getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - DevBlog`,
    description: post.description,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: ['DevBlog Team'],
      tags: post.tags,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await BlogAPI.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      
      <main className="flex-1">
        <article>
          {/* Hero Section */}
          <section className="py-12 px-4 border-b">
            <div className="container mx-auto max-w-4xl">
              <div className="mb-6">
                <Button variant="ghost" size="sm" asChild className="mb-4">
                  <Link href="/" className="flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Back to articles
                  </Link>
                </Button>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  {post.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readingTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.view_count} views
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {post.description}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Published by <span className="font-medium">DevBlog Team</span>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {post.featured_image && (
            <section className="px-4">
              <div className="container mx-auto max-w-4xl">
                <div className="aspect-video relative overflow-hidden rounded-lg my-8">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Content */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="prose-wrapper">
                <MarkdownRenderer content={post.content} />
              </div>
            </div>
          </section>

          {/* Article Footer */}
          <section className="py-8 px-4 border-t bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Enjoyed this article?</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with our latest posts and tutorials
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    Subscribe
                  </Button>
                  <Button size="sm">
                    Follow Us
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <BlogFooter />
    </div>
  );
}