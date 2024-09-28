import { NextResponse } from 'next/server';
import { verifyToken } from 'app/utility/jwt';

export async function GET(request) {
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Authorization token missing.' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = verifyToken(token);

        // Return protected data if token is valid
        return NextResponse.json({ message: `Welcome ${decoded.email}, this is protected data.` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 });
    }
}