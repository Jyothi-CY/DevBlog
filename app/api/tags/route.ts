import { NextResponse } from 'next/server';
import { BlogAPI } from '@/lib/blog-api';

export async function GET() {
  try {
    const tags = await BlogAPI.getAllTags();
    
    return NextResponse.json(tags, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}