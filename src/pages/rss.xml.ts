import rss from '@astrojs/rss'
import { getCollection, CollectionEntry } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

// import { formatBlogPosts } from '../utils/helpers'

// const postImportResult = await getCollection('blog')
// const posts: CollectionEntry<'blog'>[] = formatBlogPosts(postImportResult)

// export async function GET(context: { site: any }) {
//   return rss({
//     // stylesheet: '/rss/styles.xsl',
// title: 'Emmanuel Raymond | RSS Feed',
//     description: "Emmanuel Raymond's personal website",
//     site: context.site,
//     items: posts.map((post) => ({
//       link: `${post.data.path}/`,
//       title: post.data.title,
//       pubDate: post.data.date,
//       description: post.data.description,
//       customData: `
//       <author>Emmanuel Raymond</author>
//       `,
//     })),
//   })
// }

export async function GET(context: any) {
  const blog = await getCollection('blog')

  return rss({
    title: 'Emmanuel Raymond | RSS Feed',
    description: "Emmanuel Raymond's personal website",
    site: context.site,
    trailingSlash: false,
    items: blog.map((post) => ({
      // title: post.data.title,
      // pubDate: post.data.date,
      // description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
      ...post.data,
    })),
    customData: `<language>en-us</language>`,
  })
}
