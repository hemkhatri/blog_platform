import Link from 'next/link';

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}`, {
    next: { revalidate: 6 }
  });
  if (!res.ok) {
    throw new Error('Failed to get URL');
  }
  return res.json();
}

export default async function BlogListPage() {
  const response = await getPosts();
  const posts = response?.data || [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Latest Articles
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Insights, updates, and tutorials directly from the team.
          </p>
        </header>

        {/* Responsive Grid Layout */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => {
            const publishDate = new Date(post.publish);
            const year = publishDate.getFullYear();
            const month = String(publishDate.getMonth() + 1).padStart(2, '0');
            const day = String(publishDate.getDate()).padStart(2, '0');

            return (
              <li
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  {/* Meta Details */}
                  <div className="flex items-center gap-x-2 text-xs text-indigo-400 font-medium">
                    <time dateTime={publishDate.toISOString()}>
                      {publishDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span className="text-slate-400">By {post.author}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h2>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/posts/${year}/${month}/${day}/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-indigo-400 transition-all group-hover:text-indigo-300 group-hover:translate-x-0.5"
                  >
                    Read Story
                    <svg
                      className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Pagination Section */}
        {response?.meta && (
          <nav className="mt-12 flex items-center justify-between border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-400">
              Showing page{' '}
              <span className="font-semibold text-white">
                {response.meta.current_page}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-white">
                {response.meta.total_pages}
              </span>
            </p>
          </nav>
        )}
      </div>
    </main>
  );
}