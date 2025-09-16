// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
    icon_emoji?: string;
  };
}

// Inspirational Post interface
export interface InspirationalPost extends CosmicObject {
  type: 'inspirational-posts';
  metadata: {
    message?: string;
    short_quote?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: Category;
    reflection_questions?: string;
    author_speaker?: string;
    mood?: {
      key: string;
      value: string;
    };
    publication_date?: string;
  };
}

// Type literals for select-dropdown values
export type MoodType = 'uplifting' | 'peaceful' | 'energizing' | 'comforting' | 'motivating';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isInspirationalPost(obj: CosmicObject): obj is InspirationalPost {
  return obj.type === 'inspirational-posts';
}

// Utility types
export type CreatePostData = Omit<InspirationalPost, 'id' | 'created_at' | 'modified_at'>;