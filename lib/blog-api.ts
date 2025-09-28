import { supabase } from './supabase';
import type { BlogPost } from './supabase';

export type BlogPostsResponse = {
  posts: BlogPost[];
  total: number;
  hasMore: boolean;
};

export type SearchFilters = {
  query?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
};

export class BlogAPI {
  static async getPosts(
    page = 1,
    limit = 10,
    filters: SearchFilters = {}
  ): Promise<BlogPostsResponse> {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      // Apply search filter
      if (filters.query) {
        query = query.textSearch('title,description,content', filters.query);
      }

      // Apply tag filter
      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data: posts, error, count } = await query;

      if (error) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
      }

      return {
        posts: posts || [],
        total: count || 0,
        hasMore: (count || 0) > page * limit,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Post not found
        }
        throw new Error(`Failed to fetch post: ${error.message}`);
      }

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ view_count: (post.view_count || 0) + 1 })
        .eq('id', post.id);

      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  static async getAllTags(): Promise<string[]> {
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('status', 'published');

      if (error) {
        throw new Error(`Failed to fetch tags: ${error.message}`);
      }

      const allTags = new Set<string>();
      posts?.forEach(post => {
        post.tags?.forEach((tag: string) => allTags.add(tag));
      });

      return Array.from(allTags).sort();
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  static async createPost(post: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...post,
          published_at: post.status === 'published' ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create post: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  static async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          published_at: updates.status === 'published' ? new Date().toISOString() : null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update post: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  static async deletePost(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}