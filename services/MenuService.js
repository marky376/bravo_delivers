import MenuItem from '../models/MenuItem.js'; // Import your Mongoose model

/**
 * Get all menu items.
 */
const getMenuItems = async () => {
    return await MenuItem.find(); // Fetch from the database
};

/**
 * Get a menu item by ID.
 */
const getMenuItemById = async (id) => {
    const menuItem = await MenuItem.findById(id); // Fetch by ID from the database
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
        const newItem = new MenuItem({
            ...menuItemData,
            createdAt: new Date(),
        });
        return await newItem.save(); // Save to the database
    } catch (error) {
        throw new CustomError(500, 'Error adding menu item');
    }
};

/**
 * Update a menu item by ID.
 */
const updateMenuItem = async (id, updateData) => {
    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedItem) {
        throw new CustomError(404, `Menu item with ID ${id} not found`);
    }
    return updatedItem;
};

/**
 * Delete a menu item by ID.
 */
const deleteMenuItem = async (id) => {
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
        throw new CustomError(404, `Menu item with ID ${id} not found`);
    }
    return deletedItem;
};

/**
 * Custom Error Class
 */
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
