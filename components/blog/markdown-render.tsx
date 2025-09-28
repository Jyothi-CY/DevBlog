"use client"

import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Simple markdown-to-HTML conversion
  const renderMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-10 mb-6">$1</h1>')
      
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium">$1</a>')
      
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">')
      
      // Line breaks
      .replace(/\n/g, '<br />');
  };

  const htmlContent = `<div class="prose-content"><p class="mb-4">${renderMarkdown(content)}</p></div>`;

  return (
    <div
      className={cn(
        'prose prose-lg max-w-none',
        'prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed',
        'prose-strong:text-foreground prose-code:text-foreground',
        'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        className
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}