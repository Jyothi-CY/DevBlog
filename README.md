# DevBlog - Modern Blog Platform

A fully functional, dynamic blog platform built with Next.js 13, featuring a modern tech stack, real-time content management, and seamless database integration.

## 🚀 Features

### Core Features
- **Dynamic Content**: Fetches and renders content directly from PostgreSQL database
- **Responsive Design**: Mobile-first responsive layout
- **Search & Filter**: Advanced search by title and filter by tags
- **Rich Text Editor**: Markdown support with live preview
- **Multiple Image Support**: Upload and display multiple images per post
- **Admin Dashboard**: Full CRUD operations for content management

### Technical Features
- **Next.js 13+**: App Router, Server Components, and API Routes
- **TypeScript**: Full type safety throughout the application
- **Supabase**: PostgreSQL database with real-time capabilities
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI components
- **Markdown Editor**: Rich content creation experience

## 🛠 Tech Stack

### Frontend
- **Next.js 13.5.1** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Tailwind CSS 3.3.3** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons

### Backend & Database
- **Supabase** - PostgreSQL database & authentication
- **@supabase/supabase-js** - Database client

### Utilities
- **date-fns** - Date formatting
- **clsx & tailwind-merge** - Conditional styling
- **zod** - Schema validation
- **@uiw/react-md-editor** - Markdown editor

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/Jyothi-CY/DevBlog
cd Blog_Platform
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

#### Option A: Run Complete SQL (Recommended)
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the complete schema SQL from `database/schema.sql`

### 5. Start Development Server
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## 🗄 Database Schema

### blog_posts Table
```sql
id UUID PRIMARY KEY
title TEXT NOT NULL
slug TEXT UNIQUE NOT NULL
description TEXT NOT NULL
content TEXT NOT NULL
featured_image TEXT
author_id TEXT DEFAULT 'admin'
status TEXT DEFAULT 'draft'
tags TEXT[] DEFAULT '{}'
images JSONB DEFAULT '[]'
view_count INTEGER DEFAULT 0
published_at TIMESTAMPTZ
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()
```

### blog_images Table
```sql
id UUID PRIMARY KEY
post_id UUID REFERENCES blog_posts
url TEXT NOT NULL
alt_text TEXT
caption TEXT
position INTEGER DEFAULT 0
created_at TIMESTAMPTZ DEFAULT NOW()
```

## 🔌 API Routes

### Public Routes
- `GET /api/blogs` - Get paginated blog posts
- `GET /api/blogs/[slug]` - Get single blog post
- `GET /api/blogs/search` - Search and filter posts

### Admin Routes
- `GET /api/admin/posts` - Get all posts (admin)
- `POST /api/admin/posts` - Create new post
- `PUT /api/admin/posts/[id]` - Update post
- `DELETE /api/admin/posts/[id]` - Delete post

## 🎯 Project Structure

```
Blog_Platform/
├── app/                    # Next.js 13 App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog post pages
│   └── page.tsx           # Homepage
├── components/
│   ├── blog/              # Blog-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── supabase.ts        # Supabase client
│   ├── blog-api.ts        # Blog API functions
│   └── utils.ts           # Utility functions

```

## 🚀 Deployment

### Vercel 
1. Push code to GitHub
2. Connect the repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 📱 Usage

### For Readers
1. **Browse Posts**: Visit the homepage to see all published posts
2. **Search**: Use the search bar to find specific content
3. **Filter by Tags**: Click on tags to filter related posts
4. **Read Posts**: Click on any post to read the full content

### For Admins
1. **Access Dashboard**: Navigate to `/admin`
2. **Create Posts**: Click "New Post" to create content
3. **Manage Content**: Edit, update, or delete existing posts
4. **Upload Images**: Add multiple images to posts

## 🛠 Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Key Development Features
- **Server Components**: Optimal performance with React Server Components
- **API Routes**: RESTful API for data operations
- **Dynamic Routing**: SEO-friendly URLs with `[slug]` routes
- **Image Optimization**: Next.js Image component for optimized images

## 🔒 Security Features

- Row Level Security (RLS) in PostgreSQL
- Input validation with Zod
- XSS protection with proper sanitization
- Secure API routes with proper error handling

## 📈 Performance Optimizations

- **Static Generation**: ISR for blog posts
- **Image Optimization**: Next.js Image component
- **Database Indexing**: Optimized queries with proper indexes
- **Code Splitting**: Dynamic imports for heavy components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the MIT LICENSE file for details.

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Comments system
- [ ] Post categories
- [ ] Email subscriptions
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Multi-language support

## 📞 Contact

Project Maintainer: Jyothirmayee Nisamkarao
- Email: jyothirmayeenisamkarao@gmail.com
- GitHub: https://github.com/Jyothi-CY/DevBlog

## Acknowledgments

- Next.js team for the amazing framework
- Supabase for the excellent backend service
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible components

---

## 📋 AI Tool Usage Disclosure

This project was developed with assistance from AI tools:

- **ChatGPT/OpenAI**: Used for code generation, debugging assistance, and documentation help
