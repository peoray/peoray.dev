// interface Props {
//   title: string;
//   description: string;
//   date: string;
//   readingTime: string;
//   url: string;
// }

// import readingTime from 'reading-time';
// import { toString } from 'mdast-util-to-string';
import { formatDate } from '../utils/helpers';

// const Post = ({ time, post }: any) => {
const Post = ({ post }: any) => {
  // const time = readingTime(post.body).text;
  // console.log(post.body);
  // const textOnPage = toString(post.body);
  // const time = readingTime(textOnPage);
  // console.log(time.text);

  // const { data } = post;
  // const { title, description, path, date } = data;
  const { title, description, path, date } = post;
  return (
    <a
      href={path}
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

        {/* <span>{time}</span> */}
      </div>
    </a>
  );
};

export default Post;
