import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from 'app/lib/jwt';

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

        // Generate JWTs
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in DB
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        // Return the tokens and a success message
        return NextResponse.json({
            message: 'Sign-in successful!',
            accessToken,
            refreshToken
        }, { status: 200 });

    } catch (error) {
        console.error('Sign-in error:', error);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
