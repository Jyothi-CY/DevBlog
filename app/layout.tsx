import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevBlog - Professional Developer Insights',
  description: 'A modern blog platform built with Next.js and Supabase, featuring dynamic content management and professional design.',
  keywords: 'blog, development, programming, web development, Next.js, Supabase',
  authors: [{ name: 'DevBlog Team' }],
  creator: 'DevBlog',
  publisher: 'DevBlog',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devblog.example.com',
    siteName: 'DevBlog',
    title: 'DevBlog - Professional Developer Insights',
    description: 'A modern blog platform built with Next.js and Supabase',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevBlog - Professional Developer Insights',
    description: 'A modern blog platform built with Next.js and Supabase',
    creator: '@devblog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}