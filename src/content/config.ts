import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    path: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
    minutesRead: z.string().optional(),
  }),
});

export const collections = { blog: blogCollection };
