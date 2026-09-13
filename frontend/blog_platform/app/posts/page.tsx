import Link from 'next/link';

async function getPosts(){
    // Fallback avoids crashes if the environment variable isn't loaded yet
    const apiUrl = process.env.NEXT_PUBLIC_API || 'http://127.0.0'; 
    
    const res = await fetch(apiUrl, {
        next: { revalidate: 60 } // Revalidates cache every 60 seconds
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch blog posts');
    }
    return res.json();
}

export default async function BlogListPage() {
    const posts = await getPosts();

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '1.5rem' }}>
                        <h2>{post.title}</h2>
                        <p>By {post.author_name} on {new Date(post.publish).toLocaleDateString()}</p>
                        {/* Optimized internal routing */}
                        <Link href={`/posts/${post.slug}`}>Read More →</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
