export interface OssProject {
	title: string
	description: string
	source: string
	demo?: string
	stars: number
	forks?: number
	tech: string[]
}

const ossProjects: OssProject[] = [
	{
		title: 'AI Elements Vue',
		description:
			'A component library built on top of shadcn-vue to help you build AI-native applications faster.',
		source: 'https://github.com/vuepont/ai-elements-vue',
		demo: 'https://ai-elements-vue.com',
		stars: 631,
		tech: ['Vue', 'AI', 'Shadcn-vue', 'TypeScript'],
	},
	{
		title: 'ElevenLabs UI Vue',
		description:
			'A collection of Open Source agent and audio components that you can customize and extend.',
		source: 'https://github.com/vuepont/elevenlabs-ui-vue',
		stars: 149,
		tech: ['Vue', 'ElevenLabs', 'Shadcn-vue', 'TypeScript'],
	},
	{
		title: 'Astro Starter Blog',
		description:
			'A simple, hackable & minimalistic starter for Astro that uses Markdown for content.',
		source: 'https://github.com/peoray/astro-starter-blog',
		stars: 100,
		forks: 2,
		tech: ['Astro', 'Blog', 'Markdown', 'UI'],
	},
	{
		title: 'Astro Portfolio Starter',
		description: 'A simple portfolio theme for Astro powered by Tailwind CSS.',
		source: 'https://github.com/peoray/astro-portfolio-starter',
		stars: 72,
		tech: ['Astro', 'Portfolio', 'TailwindCSS', 'UI'],
	},
]

export default ossProjects
