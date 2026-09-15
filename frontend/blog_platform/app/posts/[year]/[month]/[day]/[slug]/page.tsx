import Link from 'next/link';

interface PostDetailPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

async function getPostDetail(year: string, month: string, day: string, slug: string) {
  const baseApiUrl = process.env.NEXT_PUBLIC_API?.replace(/\/$/, '');
  const targetUrl = `${baseApiUrl}/posts/${year}/${month}/${day}/${slug}/`;

  const res = await fetch(targetUrl, {
    next: { revalidate: 6 }
  });

  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { year, month, day, slug } = await params;
  const post = await getPostDetail(year, month, day, slug);

  // 404 / Missing Post View
  if (!post) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md text-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm shadow-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Post Not Found</h1>
          <p className="mt-2 text-sm text-slate-400">
            We couldn't retrieve that specific blog entry from our records.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              ← Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        
        {/* Navigation Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 mb-8"
        >
          <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to All Posts
        </Link>

        {/* Post Article */}
        <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-sm shadow-xl">
          <header className="border-b border-slate-800 pb-8">
            {/* Meta Tags */}
            <div className="flex items-center gap-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
              <time dateTime={`${year}-${month}-${day}`}>{formattedDate}</time>
              <span>•</span>
              <span className="text-slate-400">By {post.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Body Content */}
          <div className="mt-8 text-slate-300 leading-relaxed text-lg space-y-6">
            {post.content || post.body}
          </div>
        </article>

      </div>
    </main>
  );
}