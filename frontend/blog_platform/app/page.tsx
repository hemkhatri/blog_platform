// import Link from 'next/link';

// async function getPosts() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}`, {
//     next: { revalidate: 6 }
//   });
//   if (!res.ok) {
//     throw new Error('Failed to get URL');
//   }
//   return res.json();
// }

// export default async function BlogListPage() {
//   const response = await getPosts();
//   const posts = response?.data || [];

//   return (
//     <main className="min-h-screen bg-slate-950 text-slate-100 antialiased px-4 py-12 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">

//         {/* Header Section */}
//         <header className="mb-12 text-center md:text-left">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
//             Latest Articles
//           </h1>
//           <p className="mt-3 text-lg text-slate-400">
//             Insights, updates, and tutorials directly from the team.
//           </p>
//         </header>

//         {/* Responsive Grid Layout */}
//         <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post: any) => {
//             const publishDate = new Date(post.publish);
//             const year = publishDate.getFullYear();
//             const month = String(publishDate.getMonth() + 1).padStart(2, '0');
//             const day = String(publishDate.getDate()).padStart(2, '0');

//             return (
//               <li
//                 key={post.id}
//                 className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/10"
//               >
//                 <div>
//                   {/* Meta Details */}
//                   <div className="flex items-center gap-x-2 text-xs text-indigo-400 font-medium">
//                     <time dateTime={publishDate.toISOString()}>
//                       {publishDate.toLocaleDateString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric'
//                       })}
//                     </time>
//                     <span>•</span>
//                     <span className="text-slate-400">By {post.author}</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
//                     </svg>

//                   </div>

//                   {/* Title */}
//                   <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors">
//                     {post.title}
//                   </h2>
//                 </div>

//                 {/* Card Action Link */}
//                 <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
//                   <Link
//                     href={`/posts/${year}/${month}/${day}/${post.slug}`}
//                     className="inline-flex items-center text-sm font-semibold text-indigo-400 transition-all group-hover:text-indigo-100 group-hover:translate-x-0.5"
//                   >
//                     Read Story
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
//                     </svg>


//                   </Link>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Pagination Section */}
//         {response?.meta && (
//           <nav className="mt-12 flex items-center justify-between border-t border-slate-800 pt-6">
//             <p className="text-sm text-slate-400">
//               Showing page{' '}
//               <span className="font-semibold text-white">
//                 {response.meta.current_page}
//               </span>{' '}
//               of{' '}
//               <span className="font-semibold text-white">
//                 {response.meta.total_pages}
//               </span>
//             </p>
//           </nav>
//         )}
//       </div>
//     </main>
//   );
// }




async function getPosts(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}`, {
    next: {revalidate: 6}
  });

  if(!res.ok){
    throw new Error('Failed to get URL');
  }
  return res.json();
}

export default async function BlogListPage(){
  const response = await getPosts();
  const posts = response?.data || [];

  return(
    <main >
      <div>
        <header>
          <h1>Latest Articles</h1>
        </header>
        <ul>
          {posts.map((post:any) =>(
            <li key = {post.id}>
              <div>
                <h1>Title: {post.title}</h1>
                <h3><i>Author: {post.author}</i></h3>
                <p>Body: {post.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
}