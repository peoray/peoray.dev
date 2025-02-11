import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

// const parser = new MarkdownIt()

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

      console.log(post.frontmatter)

      return {
        link: `blog/${post.frontmatter.slug}`,
        content: contentHtml,
        ...post.frontmatter,
      }
    })
  )
  return rss({
    title: 'Emmanuel Raymond | RSS Feed',
    description: "Emmanuel Raymond's personal website",
    site: context.site,
    trailingSlash: false,
    items,
    customData: `<language>en-us</language>`,
  })
}
