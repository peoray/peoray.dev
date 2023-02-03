// export interface Props {
//     title: string;
//     description: string;
//     date: string;
//     readingTime: string;
//     url: string;
//   }
import { formatDate } from '../utils/helpers';

const Post = ({ post }: any) => {
  return (
    <div className="post mb-6">
      <span className="opacity-75">
        <span>{formatDate(post.date)}</span>
        {/* <span>Published {post.node.frontmatter.date}</span> */}
        {/* <span> &middot; </span>
              <span>Last Updated {post.node.parent.mtime}</span> */}

        {/* <span> &middot; </span>
              <span role='img' aria-label='popcorn'>
                🍿
              </span>
              {post.node.timeToRead} min read
              */}
      </span>

      <h2 className="text-2xl font-bold">
        <a href={`${post.path}`} className="text-copy-primary">
          {post.title}
        </a>
      </h2>
    </div>
  );
};

export default Post;
