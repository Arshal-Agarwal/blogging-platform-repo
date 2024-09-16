import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
        }

        // Successful sign-in
        return NextResponse.json({ message: 'Sign-in successful!' }, { status: 200 });
    } catch (error) {
        console.error('Sign-in error:', error);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
