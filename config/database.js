import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Check if database environment variables are set
const dbConfigured = process.env.DB_NAME && process.env.DB_USER && process.env.DB_HOST;

const sequelize = dbConfigured ? new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false, // Disable logging in production
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
) : null;

const connectDB = async () => {
    if (!sequelize) {
        console.warn('Database not configured. Set DB_NAME, DB_USER, DB_HOST environment variables.');
        return false;
    }
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        return false;
    }
}

export { sequelize, connectDB };
