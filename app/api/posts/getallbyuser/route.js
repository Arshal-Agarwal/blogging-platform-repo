// app/api/posts/getallbyuser/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Get email from headers
        const email = req.headers.get('x-user-email');

        // Ensure email is provided
        if (!email) {
            return new Response(JSON.stringify({ message: 'User email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Fetch posts by specific user (using email as identifier)
        const posts = await prisma.post.findMany({
            where: { email },  // Filter posts by the user's email
            orderBy: { createdAt: 'desc' },  // Order posts by latest
        });

        // Return the filtered posts as JSON
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching posts for user:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch posts' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
