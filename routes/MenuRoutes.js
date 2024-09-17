import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the path to the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const errorsPath = path.join(__dirname, '../utils/errors.json');

// Read and parse the JSON file
const errors = JSON.parse(fs.readFileSync(errorsPath, 'utf-8'));

// Simulated database for menu items
let menuItems = [];

/**
 * Generate a unique ID for a menu item.
 */
const generateMenuItemId = () => Math.random().toString(36).substring(2, 9);

/**
 * Get all menu items.
 */
const getMenuItems = async () => {
    return menuItems;
};

/**
 * Get a menu item by ID.
 */
const getMenuItemById = async (id) => {
    const menuItem = menuItems.find((item) => item.id === id);
    if (!menuItem) {
        throw new CustomError(404, `Menu item with ID ${id} not found`);
    }
    return menuItem;
};

/**
 * Add a new menu item.
 */
const addMenuItem = async (menuItemData) => {
    try {
        const newItem = {
            id: generateMenuItemId(),
            ...menuItemData,
            createdAt: new Date(),
        };
        menuItems.push(newItem);
        return newItem;
    } catch (error) {
        throw new CustomError(500, 'Error adding menu item');
    }
};

/**
 * Update a menu item by ID.
 */
const updateMenuItem = async (id, updateData) => {
    const index = menuItems.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new CustomError(404, `Menu item with ID ${id} not found`);
    }
    menuItems[index] = {
        ...menuItems[index],
        ...updateData,
        updatedAt: new Date(),
    };
    return menuItems[index];
};

/**
 * Delete a menu item by ID.
 */
const deleteMenuItem = async (id) => {
    const index = menuItems.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new CustomError(404, `Menu item with ID ${id} not found`);
    }
    const deletedItem = menuItems.splice(index, 1);
    return deletedItem[0];
};

class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default {
    getMenuItems,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
};