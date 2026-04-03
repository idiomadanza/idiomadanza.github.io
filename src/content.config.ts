import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.string(),
    image: z.string(),
    author: z.string(),
  }),
});

export const collections = {
  'blog': blog,
};
