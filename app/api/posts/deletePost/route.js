import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use a singleton pattern for Prisma Client to prevent issues during hot reloads in development
let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id'); // Get id from query string

    console.log('Received postId:', postId); // Log the postId to verify if it's being received correctly

    // Validate if postId is not null or undefined and is a valid number
    if (!postId || isNaN(postId)) {
        return NextResponse.json({ error: 'Post ID is required and should be a valid number.' }, { status: 400 });
    }

    try {
        // Convert postId to a number and check if the post exists
        const postExists = await prisma.post.findUnique({
            where: { id: Number(postId) }
        });

        if (!postExists) {
            return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
        }

        // Delete the post by ID
        await prisma.post.delete({
            where: { id: Number(postId) }
        });

        return NextResponse.json({ message: 'Post deleted successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Delete post error:', error);
        return NextResponse.json({ error: `Failed to delete post: ${error.message}` }, { status: 500 });
    }
}
