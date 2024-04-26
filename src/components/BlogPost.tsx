// ts-ignore
import { useCallback, useEffect, useRef, useState } from 'react'
import Fuse from 'fuse.js'

import Post from './Post'
import config from '../data/site-config'

export const BlogPosts = ({ posts }: { posts: any }) => {
  const inputRef = useRef<HTMLInputElement>(null || undefined)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  posts.map(async (post) => {
    const { remarkPluginFrontmatter } = await post.render()
    post.data.minutesRead = remarkPluginFrontmatter.minutesRead
    return post
  })

  //   const focusSearch = useCallback((event: { key: string }) => {
  //     // setQuery('');
  //     if (event.key === '/') {
  //       //   setQuery('');
  //       inputRef.current.focus();
  //     }
  //   }, []);

  //   useEffect(() => {
  //     document.addEventListener('keydown', focusSearch, false);

  //     return () => {
  //       document.removeEventListener('keydown', focusSearch, false);
  //     };
  //   }, [focusSearch]);

  const fuse = new Fuse(posts, {
    keys: [
      {
        name: 'title',
        getFn: (post: any) => post.data?.title,
      },
      {
        name: 'description',
        getFn: (post: any) => post.data.description,
      },
    ],
    threshold: 0.3,
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search).get('q')

    if (searchParams) setQuery(searchParams)

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          searchParams?.length || 0
      }
    }, 50)
  }, [])

  useEffect(() => {
    setResults(query.length > 0 ? fuse.search(query) : null)

    if (query.length > 0) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('q', query)

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`
      history.pushState(null, '', newUrl)
    } else {
      history.pushState(null, '', window.location.pathname)
    }
  }, [query])

  return (
    <>
      {/* <div className="py-10 mx-auto container-inner"> */}
      {/* <div onKeyDown={focusSearch}></div> */}

      <h1 className="mb-2 text-5xl font-bold">Articles</h1>
      <p className="mb-6 text-xl">
        Up to date Posts, tutorials, explanations, snippets, thoughts, musings,
        and everything else.
      </p>

      <div className="flex justify-center mb-8">
        <div className="relative w-full">
          <input
            value={query}
            ref={inputRef}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            aria-label="Search"
            id="search-form"
            placeholder="Type to filter posts..."
            className="w-full px-4 py-2 pl-10 border border-gray-500 rounded-full outline-none bg-background-form focus:border-purple-200"
          />
          <div className="absolute top-0 ml-3" style={{ top: `${10}px` }}>
            <svg
              fill="currentColor"
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                className="heroicon-ui"
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
              ></path>
            </svg>
          </div>

          {query.length > 0 && (
            <div
              className="absolute top-0 bottom-1 right-0 text-3xl mr-6 cursor-pointer text-gray-400 hover:text-gray-600"
              style={{ top: `{3}px` }}
              onClick={() => setQuery('')}
            >
              &times;
            </div>
          )}
        </div>

        <div className="self-center ml-2 text-sm">
          <p className="px-4 py-2 mr-4 font-medium text-white bg-purple-100 rounded-full hover:bg-purple-200">
            {query.length > 0 && !results?.length
              ? 0
              : results?.length || posts.length}
          </p>
        </div>
      </div>

      {results ? (
        results.length > 0 ? (
          results.map(
            (result: { refIndex: any; item: { path: any; data: any } }) => (
              <Post
                key={`${result.refIndex}-${result.item.data.path}`}
                post={result.item.data}
              />
            )
          )
        ) : (
          <>
            <span className="text-xl md:text-2xl text-center text-gray-500 py-4 font-extrabold">
              No posts found. Maybe try one of these instead?
            </span>

            <h2 className="mb-10" />

            {posts
              .map((post) => ({ post, random: Math.random() })) // Add random property to each post object
              .sort((a, b) => a.random - b.random) // Sort the posts based on the random property
              .slice(0, 3) // Take the first three posts
              .map((item: any) => (
                <Post
                  key={`${config.siteUrl}${item.post.data.path}`}
                  post={item.post.data}
                />
              ))}
          </>
        )
      ) : (
        posts.map((post: any) => (
          <Post key={`${config.siteUrl}${post.data.path}`} post={post.data} />
        ))
      )}
      {/* </div> */}
    </>
  )
}

export default BlogPosts
