import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image?: string;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  view_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
};

export type BlogImage = {
  id: string;
  post_id: string;
  url: string;
  alt_text?: string;
  caption?: string;
  position: number;
  created_at: string;
};