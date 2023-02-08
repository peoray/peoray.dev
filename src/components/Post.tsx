interface Props {
  title: string;
  description: string;
  date: string;
  minutesRead: string;
  path: string;
}

import { formatDate } from '../utils/helpers';

const Post = ({ post }: any) => {
  const { title, description, path, date, minutesRead } = post as Props;
  return (
    <a
      href={`${path}/`}
      rel="prefetch"
      className="flex flex-col gap-y-3 hover:bg-background-secondary p-4 mb-6 transition-all rounded-xl text-copy-primary hover:text-copy-primary"
    >
      <h2 className="text-purple-100 text-2xl">{title}</h2>

      <p className="text-xl font-medium">{description}</p>

      <div className="flex items-center gap-x-2 font-medium">
        <time>
          {new Date(date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>

        <span>•</span>

        <span>{minutesRead}</span>
      </div>
    </a>
  );
};

export default Post;
