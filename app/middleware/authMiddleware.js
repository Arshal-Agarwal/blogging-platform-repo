import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

export const withAuth = async (req) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return NextResponse.redirect('/signin');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.redirect('/signin');
    }

    return decoded;
};
