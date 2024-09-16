import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

// Initialize the Prisma Client
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Extract data from the request body
        const { fullName, username, email, password, bio } = await req.json();

        // Input validation
        if (!fullName || !username || !email || !password || !bio) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        // Check if email or username already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                ],
            },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email or username already exists' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                email,
                password: hashedPassword,
                bio,
            },
        });

        // Return success response
        return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
