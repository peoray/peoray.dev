import config from '../data/site-config'

export default function jsonLDGenerator({ type, post, url }: any) {
	if (type === 'post') {
		return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${url}"
        },
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.thumbnail}",
        "author": {
          "@type": "Person",
          "name": "Emmanuel Raymond",
          "url": "${config.siteUrl}/about"
        },
        "datePublished": "${post.pubDate}"
      }
    </script>`
	}

	if (type === 'person') {
		return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "${config.siteTitle}",
        "url": "${config.siteUrl}",
        "sameAs": [
          "${config.repo}",
          "https://twitter.com/peoray_",
          "https://github.com/peoray",
          "https://www.linkedin.com/in/peoray/"
        ],
        "jobTitle": "Software Engineer & Indie Hacker",
        "worksFor": {
          "@type": "Organization",
          "name": "Okikelabs"
        }
      }
    </script>`
	}

	if (type === 'collection') {
		return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "${post?.title || config.siteTitle}",
        "description": "${post?.description || config.siteDescription}",
        "url": "${url}"
      }
    </script>`
	}

	return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${config.siteTitle}",
      "url": "${config.siteUrl}"
      }
    </script>`
}
