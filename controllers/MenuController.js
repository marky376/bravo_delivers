import express from 'express';
import MenuRoutes from '../routes/MenuRoutes.js';
import { APIError } from '../middlewares/error.js';
import { get } from 'mongoose';


const { Request, Response } = express;

/**
 * Get all menu items.
 */

const getMenu = async (req, res, next) => {
    try {
        const menuItems = await MenuService.getMenuItems();
        res.status(200).json({
            message: 'Menu items fetched successfully',
            menuItems,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get a menu item by Id.
 */

const getMenuItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuService.getMenuItemBYId(id);


        if (!menuItem) {
            throw new APIError(404, `Menu item with ID ${id} not found`);
        }

        res.status(200).json({
            message: 'Menu item fetched successfully',
            menuItem,
        });
        } catch (error) {
            next(error);
    }
    
}

/**
 * Add a new Item.
 */
const addMenuItem = async (req, res, next) => {
    try {
        const {name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            throw new APIError(400, 'Missing required fields: name, description, price, or category.');
        }

        const newItem = await MenuService.addMenuItem({
            name,
            description,
            price,
            category,
        });
        
        res.status(201).json({
            message: `Menu item added successfully`,
            newItem,
        });
    } catch (error) {
        next(error);
    }
}
/**
 * Update a menu item by ID.
 */
const updateMenuItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedItem = await MenuService.updateMenuItem(id, updateDate);

        if (!updatedItem) {
            throw new APIError(404, `Menu item with ID ${id} not found`);
        }

        res.status(200).json({
            message: `Menu item updated succesfully`,
            updatedItem,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Delete a menu item by ID.
 */

const deleteMenuItem = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedItem = await MenuService.deletedMenuItem(id);


        if (!deletedItem) {
            throw new APIError(404, `Menu item with ID ${id} not found`);
        }

        res.status(200).json({
            message: `Menu item deleted successfully`,
            deletedItem,
        });
        
    } catch (error) {
        next(error);
    }
}

export default {
    getMenu,
    getMenuItem,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
};