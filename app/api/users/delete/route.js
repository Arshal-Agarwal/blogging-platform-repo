import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    // Get email from the request body
    const { email } = await req.json();

    // Validate that email is provided
    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required." }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found." }),
        { status: 404 }
      );
    }

    // Delete the user (This will also delete the associated posts due to cascading delete)
    await prisma.user.delete({
      where: { email },
    });

    return new Response(
      JSON.stringify({ message: "User and all associated posts deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete user and posts." }),
      { status: 500 }
    );
  }
}
