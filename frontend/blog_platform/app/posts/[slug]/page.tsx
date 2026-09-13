// app/posts/[slug]/page.js

async function getPostDetails(slug) {
  const res = await fetch(`http://127.0.0{slug}/`);
  
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogDetailPage({ params }) {
  // Await params in Next.js App Router
  const { slug } = await params; 
  const post = await getPostDetails(slug);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <article style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>{post.title}</h1>
      <p><em>Published on {new Date(post.publish).toDateString()}</em></p>
      <hr />
      <div style={{ whiteSpace: 'pre-line' }}>{post.body}</div>
    </article>
  );
}
