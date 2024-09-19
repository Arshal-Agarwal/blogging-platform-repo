import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyRefreshToken, signToken } from 'app/utility/jwt';

const prisma = new PrismaClient();

export async function POST(request) {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
        return NextResponse.json({ error: 'Refresh token is required.' }, { status: 400 });
    }

    try {
        // Verify the refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Find the user associated with the refresh token
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId, refreshToken }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid refresh token.' }, { status: 401 });
        }

        // Generate a new access token
        const newAccessToken = signToken(user);

        // Return the new access token
        return NextResponse.json({
            accessToken: newAccessToken
        }, { status: 200 });

    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
