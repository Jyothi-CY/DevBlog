"use client"

import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className={cn(
        'h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-border',
        className
      )}>
        {post.featured_image && (
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img
              src={post.featured_image}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            {post.published_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.published_at), 'MMM dd, yyyy')}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.view_count}
            </div>
          </div>
          
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}