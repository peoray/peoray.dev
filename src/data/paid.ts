export interface PaidProject {
	title: string
	description: string
	website: string
	status: 'Active' | 'Beta' | 'Coming Soon'
	role?: string
}

const paidProjects: PaidProject[] = [
	{
		title: 'Nuxt SaaS Kit',
		description:
			'Boilerplate that helps developers build SaaS products by providing essential features out of the box.',
		website: 'https://nuxtsaaskit.com/?ref=peoray.dev',
		status: 'Active',
		role: 'Creator',
	},
	// {
	// 	title: 'Linkvoy',
	// 	description:
	// 		'Everything you need to plan weddings without the chaos for professionals.',
	// 	website: 'https://linkvoy.com/?ref=peoray.dev',
	// 	status: 'Active',
	// 	role: 'Co-founder',
	// },
]

export default paidProjects
