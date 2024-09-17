import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params; // Fetching the ID from the params

    try {
        // Fetch the post by ID
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id),  // Parse the id to an integer
            },
        });

        // If the post doesn't exist, return a 404 error
        if (!post) {
            return new Response(JSON.stringify({ message: 'Post not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Return the post data
        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error fetching post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    return new Response(JSON.stringify({ message: `Method POST not allowed` }), {
        status: 405,
        headers: { 'Allow': 'GET' },
    });
}
