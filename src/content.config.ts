import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blogCollection = defineCollection({
  // loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
    path: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
  }),
})

export const collections = { blog: blogCollection }
