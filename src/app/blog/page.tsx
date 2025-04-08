// app/blog/page.tsx
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { getAllPosts } from '@/lib/getAllPosts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <div className='bg-[#23153c]'>
        <Nav />
      </div>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10 md:mb-16 text-center border-b pb-8 border-gray-300 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 glitch animate-glitch">
            Writings of the Mad
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay up-to-date with the latest news in marketing, media, and tech sectors,
            as we publish industry insights for public benefit.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 lg:gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md">
                <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={new Date(post.date).toISOString()}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mb-5 font-light text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No posts yet!</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check back soon for new articles.
            </p>
          </div>
        )}
      </main>
    </>
  )
}
