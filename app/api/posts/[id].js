import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            // Fetch the post by ID
            const post = await prisma.post.findUnique({
                where: {
                    id: parseInt(id),  // Parse id to an integer since it's coming from the query
                },
            });

            // If the post doesn't exist
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Return the post data
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching post' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }
}
