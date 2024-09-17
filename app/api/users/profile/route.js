import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Assuming you are using bcrypt for password hashing

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password, newEmail, newPassword } = await req.json();

        // Check if both email and password are provided
        if (!email && !password) {
            return new Response(JSON.stringify({ message: "Please provide email or password" }), { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Email update
        if (newEmail) {
            await prisma.user.update({
                where: { email },
                data: { email: newEmail }
            });
            return new Response(JSON.stringify({ message: "Email Updated Successfully" }), { status: 200 });
        }

        // Password update
        if (password && newPassword) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return new Response(JSON.stringify({ message: "Incorrect password" }), { status: 401 });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedNewPassword }
            });
            return new Response(JSON.stringify({ message: "Password Updated Successfully" }), { status: 200 });
        }

    } catch (error) {
        console.error('Error updating user:', error);
        return new Response(JSON.stringify({ message: 'Failed to update user.' }), {
            status: 500,
        });
    }
}
