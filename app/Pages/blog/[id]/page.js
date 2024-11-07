import { notFound } from 'next/navigation';
import BlogDisplayCard from 'app/Components/BlogDisplayCard';

async function fetchBlogPost(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog post');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching blog post:', error);
        throw new Error('Error fetching blog post');
    }
}

export default async function BlogPostPage({ params }) {
    const { id } = params;

    try {
        const blogData = await fetchBlogPost(id);

        if (!blogData) {
            notFound(); // Show a 404 page if the post is not found
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <BlogDisplayCard
                    title={blogData.title}
                    content={blogData.content}
                    category={blogData.category}
                    tags={blogData.tags}
                    likeCount={blogData.likeCount}
                    email={blogData.email}
                />
            </div>
        );
    } catch (error) {
        console.error('Error rendering blog post page:', error);
        return <p>Error loading post</p>; // Render an error message if data fetching fails
    }
}
