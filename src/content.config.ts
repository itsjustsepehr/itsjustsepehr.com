import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
import { categorySlugs } from './lib/site';
const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({ title: z.string(), description: z.string(), category: z.enum(categorySlugs), tags: z.array(z.string()), date: z.coerce.date(), cover: z.string().startsWith('/'), coverAlt: z.string(), language: z.enum(['en', 'fa']), draft: z.boolean().default(false) }),
});
export const collections = { writing };
