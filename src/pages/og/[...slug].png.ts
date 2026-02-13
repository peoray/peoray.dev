import { getCollection, type CollectionEntry } from 'astro:content'
import fs from 'node:fs/promises'
import path from 'node:path'
import satori from 'satori'
import { html } from 'satori-html'
import sharp from 'sharp'

interface Props {
	post: CollectionEntry<'blog'>
}

export async function getStaticPaths() {
	const posts = await getCollection('blog')
	return posts.map((post) => ({
		params: { slug: post.data.slug || post.id },
		props: { post },
	}))
}

export const GET = async ({ props }: { props: Props }) => {
	const { post } = props
	const fontPath = path.resolve('./public/fonts/Satoshi-Bold.ttf')
	const fontData = await fs.readFile(fontPath)

	// Tailwind classes map:
	// bg-gray-900 -> #111827
	// text-gray-300 -> #cbd5e0
	// text-white -> #fff
	// text-purple-500 -> #7e60db (using custom color)
	// border-purple-500 -> #7e60db
	// p-20 -> 80px
	// text-6xl -> 64px
	// text-4xl -> 32px
	// text-2xl -> 24px

	const markup = html`<div
		style="background-color: #111827; color: #cbd5e0; height: 100%; width: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; padding: 80px; border-bottom: 20px solid #7e60db;"
	>
		<div style="display: flex; flex-direction: column;">
			<div
				style="font-size: 64px; font-weight: bold; margin-bottom: 24px; line-height: 1.1; color: #fff; font-family: 'Satoshi'"
			>
				${post.data.title}
			</div>
			<div
				style="font-size: 32px; color: #9ca3af; line-height: 1.4; max-width: 900px; font-family: 'Satoshi'"
			>
				${post.data.description}
			</div>
		</div>

		<div
			style="display: flex; justify-content: space-between; width: 100%; align-items: flex-end;"
		>
			<div style="display: flex; align-items: center;">
				<div
					style="font-size: 32px; font-weight: bold; color: #7e60db; font-family: 'Satoshi'"
				>
					peoray.dev
				</div>
			</div>

			<div style="font-size: 24px; color: #9ca3af; font-family: 'Satoshi'">
				${post.data.pubDate.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</div>
		</div>
	</div>`

	const svg = await satori(markup as any, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Satoshi',
				data: fontData,
				style: 'normal',
				weight: 700, // loading Bold font
			},
		],
	})

	const png = await sharp(Buffer.from(svg)).png().toBuffer()

	return new Response(png as any, {
		headers: {
			'Content-Type': 'image/png',
		},
	})
}
