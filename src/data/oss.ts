export interface OssProject {
	title: string
	description: string
	source: string
	demo?: string
	stars: number
	forks: number
	tech: string[]
}

const ossProjects: OssProject[] = [
	{
		title: 'Spark UI',
		description: 'Experience The Magic Of Animated Vue Components.',
		source: 'https://github.com/selemondev/spark-ui',
		demo: 'https://spark-ui.vercel.app',
		stars: 631,
		forks: 13,
		tech: ['Vue', 'TailwindCSS', 'Vueuse', 'Motion', 'Vitepre'],
	},
	{
		title: 'Marquee',
		description: 'A beautiful component for creating marquees in Vue.',
		source: 'https://github.com/selemondev/vue3-marquee',
		stars: 149,
		forks: 7,
		tech: ['Vue', 'TailwindCSS', 'TypeScript', 'Vite'],
	},
	{
		title: 'Svelte Marquee',
		description: 'A beautiful component for creating marquees in Svelte.',
		source: 'https://github.com/selemondev/svelte-marquee',
		stars: 100,
		forks: 2,
		tech: ['Svelte', 'TailwindCSS', 'TypeScript', 'Vite'],
	},
	{
		title: 'Create Vue3 App',
		description: 'The Next Generation Vue 3 Scaffolding CLI Tool.',
		source: 'https://github.com/selemondev/create-vue3-app',
		stars: 72,
		forks: 1,
		tech: ['Node', 'Esbuild', 'TypeScript'],
	},
	{
		title: 'Nuxt UI Primitives',
		description:
			'Unstyled, accessible UI primitives for building Nuxt applications.',
		source: 'https://github.com/peoray/nuxt-ui-primitives',
		stars: 45,
		forks: 3,
		tech: ['Nuxt', 'Vue', 'TypeScript'],
	},
	{
		title: 'Vue Sonner',
		description: 'An opinionated toast notification component for Vue.',
		source: 'https://github.com/peoray/vue-sonner',
		demo: 'https://vue-sonner.vercel.app',
		stars: 38,
		forks: 5,
		tech: ['Vue', 'TypeScript', 'Vite'],
	},
]

export default ossProjects
