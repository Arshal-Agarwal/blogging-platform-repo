// app/api/test-connection.mjs
import sequelize from '../lib/db.mjs';

console.log('Starting script...');

async function testConnection() {
    try {
        console.log('Attempting to connect to the database...');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Run a raw SQL query to show tables
        const [results, metadata] = await sequelize.query('SHOW TABLES');
        
        console.log('Tables in the database:');
        console.log(results); // results will contain the tables information
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
console.log('Script finished.');
