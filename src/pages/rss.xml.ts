import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'

export async function GET(context: { site: string }) {
  const postImportResult = import.meta.glob('../content/blog/**/*.md', {
    eager: true,
  })
  const posts = Object.values(postImportResult)

  // Fetch and compile content for all posts in parallel
  const items = await Promise.all(
    posts.map(async (post: any) => {
      const contentHtml = sanitizeHtml(await post.compiledContent(), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      })

      return {
        link: `blog/${post.frontmatter.slug}`,
        content: contentHtml,
        ...post.frontmatter,
        customData: `<lastModified>${
          post.frontmatter.lastModified || post.frontmatter.pubDate
        }</lastModified>`,
      }
    })
  )

  // Filter out draft posts
  const filteredItems = items.filter((item) => !item.draft)

  // Sort items in descending order based on lastModified or pubDate
  filteredItems.sort((a, b) => {
    const dateA = new Date(a.pubDate)
    const dateB = new Date(b.pubDate)
    return dateB.getTime() - dateA.getTime()
  })

  // Determine the last build date based on the most recent lastModified or pubDate
  const lastBuildDate = filteredItems
    .reduce((latestDate, item) => {
      const itemDate = new Date(item.lastModified || item.pubDate)
      return itemDate > latestDate ? itemDate : latestDate
    }, new Date(0))
    .toISOString()

  return rss({
    title: 'Emmanuel Raymond | RSS Feed',
    description: "Emmanuel Raymond's personal website",
    site: context.site,
    trailingSlash: false,
    items: filteredItems,
    customData: `<language>en-us</language><lastBuildDate>${lastBuildDate}</lastBuildDate>`,
  })
}
