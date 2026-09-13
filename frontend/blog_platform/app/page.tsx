async function getPosts(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}`, {
        next : {revalidate : 60}
    });
    if(!res.ok){
        throw new Error('Failed to get URL');
    }
    return res.json();
}

export default async function BlogListPage(){
    const posts = await getPosts();

   return (
    <main style={{ padding: '2rem' }}>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '1.5rem' }}>
            <h2>{post.title}</h2>
            <p>By {post.author_name} on {new Date(post.publish).toLocaleDateString()}</p>
            <a href={`/posts/${post.slug}`}>Read More →</a>
          </li>
        ))}
      </ul>
    </main>
  );
}