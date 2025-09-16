# Inspirational Blog Platform

![App Preview](https://imgix.cosmicjs.com/0a0eb8c0-9302-11f0-bba7-d56988718db7-photo-1506905925346-21bda4d32df4-1758029741037.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform for sharing inspirational content with categories, mood-based filtering, and beautiful content presentation.

## Features

- 🌟 **Dynamic Content Display**: Rich inspirational posts with HTML content and reflection questions
- 🏷️ **Category Navigation**: Browse by Personal Growth, Gratitude & Joy, and Hope & Faith
- 💫 **Mood-Based Filtering**: Filter posts by emotional tone and mood
- 📱 **Responsive Design**: Beautiful layouts across all devices
- ✨ **Interactive UI**: Smooth animations and hover effects
- 👤 **Author Attribution**: Display post authors and speakers
- 🎨 **Category Color Themes**: Visual organization with category-specific colors
- 📖 **Individual Post Pages**: Full content display with reflection questions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c965c7fe0840663f64f9a8&clone_repository=68c968acfe0840663f64f9c3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Headless CMS integration
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content model set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
# Copy the example file
cp .env.example .env.local

# Add your Cosmic credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Inspirational Posts

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with categories
const response = await cosmic.objects
  .find({ type: 'inspirational-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects
```

### Fetching Categories

```typescript
// Get all categories
const response = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])

const categories = response.objects
```

### Filtering by Category

```typescript
// Get posts by specific category
const response = await cosmic.objects
  .find({ 
    type: 'inspirational-posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with Cosmic CMS using the following content structure:

- **Inspirational Posts**: Main content with message, quotes, images, categories, and mood
- **Categories**: Content organization with names, descriptions, colors, and emoji icons

The app automatically pulls content from your Cosmic bucket and displays it with proper formatting, responsive images, and category-based navigation.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

### Environment Variables

Set these in your deployment platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->