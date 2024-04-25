import rss from '@astrojs/rss'
import { getCollection, CollectionEntry } from 'astro:content'
import { formatBlogPosts } from '../utils/helpers'

const postImportResult = await getCollection('blog')
const posts: CollectionEntry<'blog'>[] = formatBlogPosts(postImportResult)

export async function GET(context: { site: any }) {
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: "Emmanuel Raymond's Blog",
    description: 'Personal Website of Emmanuel Raymond',
    site: context.site,
    items: posts.map((post) => ({
      link: `${post.data.path}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      customData: `
      <author>Emmanuel Raymond</author>
      `,
    })),
  })
}
