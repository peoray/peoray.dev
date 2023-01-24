import urljoin from 'url-join';
import dayjs from 'dayjs';
import { config } from '../data/siteConfig';
import kebabCase from 'lodash.kebabCase';

const editOnGithub = (slug: string) => {
  return urljoin(config.repo, '/blob/master/content/posts', `${slug}/index.md`);
};

const formatDate = (date: string) => {
  return dayjs(date).format('MMM DD, YYYY');
};

const kebabCaseStr = (str: string) => {
  return kebabCase(str);
};

// eslint-disable-next-line import/prefer-default-export
export { editOnGithub, formatDate, kebabCaseStr };
