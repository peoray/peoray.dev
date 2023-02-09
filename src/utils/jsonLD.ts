import config from '../data/site-config';

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
          "url": "${config.siteUrl}/about/"
        },
        "datePublished": "${post.date}"
      }
    </script>`;
  }
  return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${config.siteTitle}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`;
}
