import urljoin from 'url-join';
import dayjs from 'dayjs';
import config from '../data/siteConfig';
// @ts-ignore
import kebabCase from 'lodash.kebabCase';

const editOnGithub = (slug: string) => {
  return urljoin(config.repo, '/blob/master/content/posts', `${slug}/index.md`);
};

const formatDate = (date: string) => {
  return dayjs(date).format('MMM DD, YYYY');
};

const kebabCaseStr = (str: string | any) => {
  return kebabCase(str);
};

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
    const { draft, date } = post.frontmatter;
    // filterOutDrafts if true, filter out posts with draft: true
    if (filterOutDrafts && draft) {
      return acc;
    }
    // filterOutFuturePosts if true, filter out posts with date in the future
    if (filterOutFuturePosts && dayjs(date).isAfter(dayjs())) {
      return acc;
    }
    return [...acc, post];
  }, []);

  // sort by date if true
  const sortedPosts = sortByDate
    ? filteredPosts.sort((a: any, b: any) => {
        return dayjs(b.frontmatter.date).diff(dayjs(a.frontmatter.date));
      })
    : filteredPosts;

  // limit posts if limit is a number
  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
};

// eslint-disable-next-line import/prefer-default-export
export { editOnGithub, formatDate, kebabCaseStr, formatBlogPosts };
