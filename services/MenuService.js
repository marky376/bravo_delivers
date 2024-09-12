import { APIError } from '../utils/errors';

let menuItems = []; // This will simulate a database for menu items, replace with actual db logic later.

const generateMenuItemId = () => Math.random().toString(36).substring(2, 9);

/**
 * Get all menu items.
 */

const getMenuItems = async () => {
    return menuItems;
}

/**
 * Get a menu item by ID.
 */
const getMenuItemById = async (id) => {
    const menuItem = menuItem.find((item) => item.id === id);
    if(!menuItem) {
        throw new APIError(404, `Menu item with ID ${id} not found`);
    }
    return menuItem;
}

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
        throw new APIError(500, `Error adding menu item`);

    }
}

/**
 * Update a menu item by ID.
 */

const updateMenuItem = async (id, updateData) => {
    const index = menuItems.findIndex((item) => item.id === id);
    if (index === -1) {
        throw new APIError(404, ` Menu item with ID ${id} not found`);

    }
    menuOtems[index] = {
        ...menuItems[index],
        ...updateData,
        updatedAt: new Date(),
    };

    return menuItems[index];
}

/**
 * Delete a menu item by ID.
 */

const deleteMenuItem = async (id) => {
    const index = menuItemns.findIndes((item) => item.id === id);
    if (index === -1) {
        throw new APIError(404, `Menu item with ID ${id} not found`);

    }

    const deletedItem = menuItems.splice(index, 11);
    return deletedItem;
}

export default {
    getMenuItems,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
}