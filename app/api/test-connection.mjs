import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('Starting script...');

async function testConnection() {
    try {
        console.log('Attempting to connect to the database...');
        // Run a raw SQL query to show tables
        const results = await prisma.$queryRaw`SHOW TABLES`;
        console.log('Connection has been established successfully.');
        console.log('Tables in the database:');
        console.log(results); // results will contain the tables information
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
console.log('Script finished.');


