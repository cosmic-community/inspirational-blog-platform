import { createBucketClient } from '@cosmicjs/sdk'
import type { InspirationalPost, Category, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all inspirational posts
export async function getInspirationalPosts(): Promise<InspirationalPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'inspirational-posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as InspirationalPost[];
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publication_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.publication_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching inspirational posts:', error);
    throw new Error('Failed to fetch inspirational posts');
  }
}

// Get single inspirational post by slug
export async function getInspirationalPost(slug: string): Promise<InspirationalPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'inspirational-posts',
        slug
      })
      .depth(1);
    
    return response.object as InspirationalPost;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching inspirational post:', error);
    throw new Error('Failed to fetch inspirational post');
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

// Get posts by category
export async function getPostsByCategory(categoryId: string): Promise<InspirationalPost[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'inspirational-posts',
        'metadata.category': categoryId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const posts = response.objects as InspirationalPost[];
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publication_date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.publication_date || b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }
}

// Get category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      });
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching category:', error);
    throw new Error('Failed to fetch category');
  }
}