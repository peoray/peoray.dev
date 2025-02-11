import urljoin from 'url-join'
import dayjs from 'dayjs'
import config from '../data/site-config'
// @ts-ignore
import kebabCase from 'lodash.kebabcase'

const editOnGithub = (slug: string) => {
  return urljoin(config.repo, '/blob/master/content/posts', `${slug}/index.md`)
}

const formatDate = (date: string) => {
  return dayjs(date).format('MMM DD, YYYY')
}

const kebabCaseStr = (str: string | any) => {
  return kebabCase(str)
}

const formatBlogPosts = (
  posts: any,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = posts.length,
  } = {}
) => {
  const filteredPosts = posts.reduce((acc: any, post: any) => {
    const { draft, date } = post.data
    // filterOutDrafts if true, filter out posts with draft: true
    if (filterOutDrafts && draft) {
      return acc
    }
    // filterOutFuturePosts if true, filter out posts with date in the future
    if (filterOutFuturePosts && dayjs(date).isAfter(dayjs())) {
      return acc
    }
    return [...acc, post]
  }, [])

  // sort by date if true
  const sortedPosts = sortByDate
    ? filteredPosts.sort((a: any, b: any) => {
        return dayjs(b.data.pubDate).diff(dayjs(a.data.pubDate))
      })
    : filteredPosts

  // limit posts if limit is a number
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}

// eslint-disable-next-line import/prefer-default-export
export { editOnGithub, formatDate, kebabCaseStr, formatBlogPosts }
