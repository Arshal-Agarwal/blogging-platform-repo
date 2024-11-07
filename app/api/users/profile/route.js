// app/api/users/profile/route.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, newEmail, password, newPassword } = await req.json();

        // Validate that current email is provided
        if (!email) {
            return new Response(JSON.stringify({ message: 'Current email is required.' }), { status: 400 });
        }

        // Find the user by current email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found.' }), { status: 404 });
        }

        // Handle email update if newEmail is provided
        if (newEmail) {
            await prisma.user.update({
                where: { email },
                data: { email: newEmail }
            });
            return new Response(JSON.stringify({ message: 'Email updated successfully.' }), { status: 200 });
        }

        // Handle password update if both current password and new password are provided
        if (password && newPassword) {
            // Check if the current password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return new Response(JSON.stringify({ message: 'Incorrect current password.' }), { status: 401 });
            }

            // Hash the new password and update
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { email },
                data: { password: hashedNewPassword }
            });
            return new Response(JSON.stringify({ message: 'Password updated successfully.' }), { status: 200 });
        }

        // No fields to update if neither newEmail nor newPassword provided
        return new Response(JSON.stringify({ message: 'No fields to update.' }), { status: 400 });

    } catch (error) {
        console.error('Error updating user profile:', error);
        return new Response(JSON.stringify({ message: 'Failed to update profile.' }), { status: 500 });
    }
}
