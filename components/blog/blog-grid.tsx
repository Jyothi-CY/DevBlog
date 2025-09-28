"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BlogCard } from './blog-card';
import { SearchFilters } from './search-filters';
import type { BlogPost } from '@/lib/supabase';
import { Loader as Loader2, CircleAlert as AlertCircle } from 'lucide-react';

interface BlogGridProps {
  initialPosts: BlogPost[];
  initialTotal: number;
  initialHasMore: boolean;
}

//export function BlogGrid({ initialPosts, initialTotal, initialHasMore }: BlogGridProps) {
export function BlogGrid({ initialPosts, initialTotal, initialHasMore }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<{
    query?: string;
    tags?: string[];
  }>({});
  const [error, setError] = useState<string | null>(null);

  // Reset and fetch posts when filters change
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams({
          page: '1',
          limit: '12',
        });

        if (filters.query) {
          params.set('query', filters.query);
        }

        if (filters.tags && filters.tags.length > 0) {
          params.set('tags', filters.tags.join(','));
        }

        const response = await fetch(`/api/blogs?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts);
        setTotal(data.total);
        setHasMore(data.hasMore);
        setPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const params = new URLSearchParams({
        page: nextPage.toString(),
        limit: '12',
      });

      if (filters.query) {
        params.set('query', filters.query);
      }

      if (filters.tags && filters.tags.length > 0) {
        params.set('tags', filters.tags.join(','));
      }

      const response = await fetch(`/api/blogs?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to load more posts');
      }

      const data = await response.json();
      setPosts(prev => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query: query || undefined }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFilters(prev => ({ ...prev, tags: tags.length > 0 ? tags : undefined }));
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <SearchFilters
        onSearch={handleSearch}
        onTagsChange={handleTagsChange}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading && page === 1 ? 'Searching...' : `${total} ${total === 1 ? 'post' : 'posts'} found`}
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-2 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="ml-auto"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={loadMore}
                disabled={loading}
                className="min-w-[150px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      ) : !loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-2">No posts found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms or clearing the filters
          </p>
        </div>
      ) : null}

      {/* Initial Loading */}
      {loading && page === 1 && posts.length === 0 && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}