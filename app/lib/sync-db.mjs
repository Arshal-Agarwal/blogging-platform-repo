import sequelize from './db.mjs';
import User from '../models/user.mjs';

async function syncDatabase() {
    try {
        console.log('Synchronizing models with the database...');

        // Sync all models
        await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables

        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
}

syncDatabase();
