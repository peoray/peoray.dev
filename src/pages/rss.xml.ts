import rss, { type RSSFeedItem } from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { parse as htmlParser } from 'node-html-parser'
import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'

const markdownParser = new MarkdownIt()

// get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/images/blog/**/*.{jpeg,jpg,png,gif}'
)

export async function GET(context: { site: string }) {
  if (!context.site) {
    throw Error('site not set')
  }

  const postImportResult = import.meta.glob('../content/blog/**/*.md', {
    eager: true,
  })
  const posts = Object.values(postImportResult)

  // Helper function to process images in HTML content
  async function processImages(htmlContent: string, site: string) {
    const root = htmlParser(htmlContent)
    const imgElements = root.querySelectorAll('img')

    for (const img of imgElements) {
      const srcPath = img.getAttribute('src')
      if (!srcPath) continue

      // Handle both relative and absolute paths
      const isRelativePath =
        !srcPath.startsWith('http') && !srcPath.startsWith('//')

      if (isRelativePath) {
        // Convert the src path to match the structure in imagesGlob
        const normalizedPath = srcPath.startsWith('/')
          ? srcPath
          : `/src/content/images/blog/${srcPath}`

        // Find the matching image in imagesGlob
        const matchingImagePath = Object.keys(imagesGlob).find((path) =>
          path.endsWith(srcPath.split('/').pop() || '')
        )

        if (matchingImagePath) {
          try {
            // Import the image
            const imageModule = await imagesGlob[matchingImagePath]()

            // Process the image with getImage
            const processedImage = await getImage({
              src: imageModule.default,
              width: 800, // Set appropriate width
              format: 'webp', // Or keep original format
            })

            // Update the img tag with the full URL and original image dimensions
            img.setAttribute('src', `${site}${processedImage.src}`)
            // Use the original image metadata for dimensions
            img.setAttribute('width', imageModule.default.width.toString())
            img.setAttribute('height', imageModule.default.height.toString())
          } catch (error) {
            console.error(`Failed to process image: ${srcPath}`, error)
          }
        }
      }
    }

    return root.toString()
  }

  // Fetch and compile content for all posts in parallel
  const items = await Promise.all(
    posts.map(async (post: any) => {
      const contentHtml = sanitizeHtml(await post.compiledContent(), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          img: ['src', 'alt', 'width', 'height'],
        },
      })

      // Process images in the content
      const processedContent = await processImages(contentHtml, context.site)

      return {
        author: 'Emmanuel Raymond (emmanuelrayymond@gmail.com)',
        link: `blog/${post.frontmatter.slug}`,
        content: processedContent,
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

  // Determine the last build date
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
