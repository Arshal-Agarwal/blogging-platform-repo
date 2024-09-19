// app/api/users/profile/route.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { withAuth } from 'app/middleware/authMiddleware';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Get user info from JWT
        const user = await withAuth(req);
        if (user.error) {
            return new Response(JSON.stringify({ message: user.error }), { status: 401 });
        }

        // Fetch the user's profile data
        const userProfile = await prisma.user.findUnique({
            where: { id: user.id }, // Ensure we only fetch the current user's profile
            select: { id: true, email: true, name: true, createdAt: true } // Customize fields as needed
        });

        if (!userProfile) {
            return new Response(JSON.stringify({ message: 'User profile not found.' }), { status: 404 });
        }

        return new Response(JSON.stringify({ userProfile }), { status: 200 });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Get user info from JWT
        const user = await withAuth(req);
        if (user.error) {
            return new Response(JSON.stringify({ message: user.error }), { status: 401 });
        }

        // Extract user details from request body
        const { email, password, newEmail, newPassword } = await req.json();

        // Check if email is provided for finding user
        if (!email) {
            return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
        }

        // Find the user by email
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Ensure user is trying to update their own profile
        if (existingUser.id !== user.id) {
            return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
        }

        // Handle email update
        if (newEmail) {
            await prisma.user.update({
                where: { id: user.id },
                data: { email: newEmail }
            });
            return new Response(JSON.stringify({ message: 'Email Updated Successfully' }), { status: 200 });
        }

        // Handle password update
        if (password && newPassword) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return new Response(JSON.stringify({ message: 'Incorrect password' }), { status: 401 });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedNewPassword }
            });
            return new Response(JSON.stringify({ message: 'Password Updated Successfully' }), { status: 200 });
        }

        // If neither email nor password is provided to update
        return new Response(JSON.stringify({ message: 'No fields to update' }), { status: 400 });

    } catch (error) {
        console.error('Error updating user:', error);
        return new Response(JSON.stringify({ message: 'Failed to update user.' }), { status: 500 });
    }
}
