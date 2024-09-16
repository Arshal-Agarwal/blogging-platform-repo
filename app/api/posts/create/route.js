import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Parse the request body
        const body = await req.json();
        const { title, content, category, tags } = body;

        // Check if all necessary fields are provided
        if (!title || !content || !category || !tags) {
            return new Response(JSON.stringify({ message: 'All fields are required.' }), {
                status: 400,
            });
        }

        // Create a comma-separated string from tags array (if tags are an array)
        const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

        // Create the new post in the database
        const post = await prisma.post.create({
            data: {
                title,
                content,
                category,
                tags: tagsString, // Store tags as a comma-separated string
            },
        });

        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ message: 'Failed to create post.' }), {
            status: 500,
        });
    }
}
