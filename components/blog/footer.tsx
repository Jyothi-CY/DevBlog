"use client"

import { PenTool, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function BlogFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <PenTool className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevBlog</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              A modern blog platform built with Next.js, Supabase, and cutting-edge web technologies. 
              Share your insights and connect with fellow developers.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/admin" className="block text-muted-foreground hover:text-primary transition-colors">
                Admin
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold mb-4">Built With</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Next.js 13 (App Router)</p>
              <p>Supabase PostgreSQL</p>
              <p>Tailwind CSS</p>
              <p>TypeScript</p>
              <p>Radix UI Components</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 DevBlog. Built as a demonstration of modern web development practices.</p>
          <p className="mt-2">
            Created with Next.js, Supabase, and deployed on Bolt Hosting.
          </p>
        </div>
      </div>
    </footer>
  );
}