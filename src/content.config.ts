import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
  schema: ({ image }) => z.object({
    id: z.string().optional(),
    name: z.string(),
    role: z.string().optional(),
    isFounder: z.boolean().default(false),
    founderQuote: z.string().optional(),
    instagram: z.string().url().optional(),
    image: image(),
    imagePosition: z.string().default('object-center'),
    bio: z.array(z.object({
      icon: z.string(),
      text: z.string()
    })).optional()
  })
});

const workshopsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/workshops' }),
  schema: ({ image }) => z.object({
    id: z.string().optional(),
    title: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    instructor: z.string(),
    price: z.string(),
    image: image(),
    description: z.string().optional(),
    level: z.string().optional(),
    featured: z.boolean().default(false),
    buttonText: z.string().default('Details'),
    isSoldOut: z.boolean().default(false),
    ticketUrl: z.string().url().optional()
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.string(),
    image: image(),
    author: z.string()
  })
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    text: z.string(),
    rating: z.number().min(1).max(5).default(5),
    image: image(),
    videoUrl: z.string().url().optional()
  })
});

export const collections = {
  'team': teamCollection,
  'workshops': workshopsCollection,
  'blog': blogCollection,
  'testimonials': testimonialsCollection,
};
