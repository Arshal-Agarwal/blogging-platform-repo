// app/api/users/getUsername/route.js
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

        // Fetch the username by specific email
        const user = await prisma.user.findUnique({
            where: { email },
            select: { username: true },  // Select only the username field
        });

        // If user not found, return a 404 error
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Return the username as JSON
        return new Response(JSON.stringify({ username: user.username }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching username:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch username' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
