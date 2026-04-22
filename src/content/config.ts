import { z, defineCollection } from 'astro:content';

const teamCollection = defineCollection({
  type: 'data',
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
  type: 'data',
  schema: ({ image }) => z.object({
    id: z.string(),
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
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.string(),
    image: image(),
    author: z.string()
  })
});

export const collections = {
  'team': teamCollection,
  'workshops': workshopsCollection,
  'blog': blogCollection,
};
