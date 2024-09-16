import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch all posts from the database
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',  // Order posts by latest
            },
        });

        // Return the posts as JSON
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch posts' }), {
            status: 500,
        });
    }
}
