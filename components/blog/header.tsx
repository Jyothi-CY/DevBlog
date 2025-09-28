"use client"

import Link from 'next/link';
import { PenTool, Chrome as Home, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PenTool className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">DevBlog</h1>
              <p className="text-xs text-muted-foreground">Professional insights & tutorials</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              href="/admin"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}