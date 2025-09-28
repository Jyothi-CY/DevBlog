/*
  Blog Platform Database Schema - Enhanced Version
  Includes multiple images support and storage setup
*/

-- First, check and add the images column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'blog_posts' AND column_name = 'images') THEN
        ALTER TABLE blog_posts ADD COLUMN images JSONB DEFAULT '[]';
    END IF;
END $$;

-- Create blog_images table (for backward compatibility) if not exists
CREATE TABLE IF NOT EXISTS blog_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow full access to posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access to images" ON blog_images;
DROP POLICY IF EXISTS "Allow full access to images" ON blog_images;

-- Simple policies that work without authentication
CREATE POLICY "Allow public read access to published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow full access to posts" ON blog_posts
  FOR ALL USING (true);

CREATE POLICY "Allow public read access to images" ON blog_images
  FOR SELECT USING (true);

CREATE POLICY "Allow full access to images" ON blog_images
  FOR ALL USING (true);

-- Create indexes (with IF NOT EXISTS to avoid errors)
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_images_post_id ON blog_images(post_id);

-- Create function to update updated_at (replace if exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for blog images (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Allow public read access to blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete blog images" ON storage.objects;

-- Storage policy for blog images
CREATE POLICY "Allow public read access to blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to update blog images" ON storage.objects
FOR UPDATE USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to delete blog images" ON storage.objects
FOR DELETE USING (bucket_id = 'blog-images');

-- Clear existing data and insert fresh sample data
TRUNCATE TABLE blog_posts CASCADE;

-- Insert sample data with multiple images support
INSERT INTO blog_posts (title, slug, description, content, status, tags, images, published_at) VALUES
(
  'Getting Started with Next.js 13',
  'getting-started-with-nextjs-13',
  'Learn the fundamentals of Next.js 13 and explore its new app directory structure.',
  '# Getting Started with Next.js 13

Next.js 13 introduces revolutionary changes that make building React applications more intuitive and powerful than ever before.

## Key Features

### App Router
The new app directory provides a more intuitive file-system based router.

### Server Components
Server Components allow you to render components on the server.

### Streaming
Built-in support for streaming allows you to show parts of the page as soon as they are ready.

## Getting Started

First, create a new Next.js application:

```bash
npx create-next-app@latest my-app
Conclusion
Next.js 13 represents a significant leap forward in React development.',
'published',
ARRAY['nextjs', 'react', 'web-development'],
'[
{"url": "/images/nextjs-banner.jpg", "alt": "Next.js Banner", "caption": "Next.js 13 Features"},
{"url": "/images/app-router.jpg", "alt": "App Router", "caption": "New App Directory Structure"}
]'::jsonb,
NOW() - INTERVAL '2 days'
),
(
'Modern CSS Techniques',
'modern-css-techniques',
'Explore cutting-edge CSS features and techniques.',
'# Modern CSS Techniques

CSS continues to evolve rapidly with powerful new features.

Container Queries
Container queries allow styling based on container size.

CSS Grid Subgrid
Subgrid allows child elements to participate in parent grid.

Cascade Layers
Control specificity with @layer.

These techniques create responsive, maintainable designs.',
'published',
ARRAY['css', 'web-design', 'frontend'],
'[
{"url": "/images/css-grid.jpg", "alt": "CSS Grid", "caption": "Modern CSS Layout"},
{"url": "/images/container-queries.jpg", "alt": "Container Queries", "caption": "Responsive Design"}
]'::jsonb,
NOW() - INTERVAL '5 days'
),
(
'Building Scalable React Applications',
'building-scalable-react-applications',
'Best practices for creating maintainable React applications.',
'# Building Scalable React Applications

As React applications grow, following best practices becomes crucial.

Project Structure
Organize components by feature with clear naming conventions.

State Management
Choose the right solution for your needs.

Performance Optimization
Use code splitting and memoization strategically.

Testing Strategy
Implement comprehensive testing at all levels.

Focus on maintainability and developer experience.',
'published',
ARRAY['react', 'javascript', 'architecture'],
'[
{"url": "/images/react-architecture.jpg", "alt": "React Architecture", "caption": "Scalable Application Structure"}
]'::jsonb,
NOW() - INTERVAL '1 week'
),
(
'TypeScript Best Practices',
'typescript-best-practices',
'Learn TypeScript tips and patterns for better code quality.',
'# TypeScript Best Practices

TypeScript helps you write more robust and maintainable code.

Type Safety
Catch errors during development rather than at runtime.

Better IDE Support
Get intelligent code completion and refactoring tools.

Enhanced Readability
Make code more self-documenting with type annotations.

Start using TypeScript today for better development experience!',
'draft',
ARRAY['typescript', 'javascript', 'programming'],
'[]'::jsonb,
NULL
);

-- Insert sample images for backward compatibility
INSERT INTO blog_images (post_id, url, alt_text, caption, position) VALUES
(
(SELECT id FROM blog_posts WHERE slug = 'getting-started-with-nextjs-13'),
'/images/nextjs-banner.jpg',
'Next.js Banner',
'Next.js 13 Features',
1
),
(
(SELECT id FROM blog_posts WHERE slug = 'modern-css-techniques'),
'/images/css-grid.jpg',
'CSS Grid',
'Modern CSS Layout',
1
);

SELECT 'Enhanced database setup completed successfully!' AS message;