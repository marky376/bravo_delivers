import { Request, Response } from 'express';
import MenuService from '../services/MenuService';
import OrderService from '../services/OrderService';
import { APIError } from '../utils/error';

/**
 * Create a new order.
 */
const createOrder = async (req, res, next) => {
    try {
        const { customerId, items, deliveryAddress } = req.body;

        // 1. Validate the request
        if (!customerId || !items || !items.length || !deliveryAddress) {
            throw new APIError(400, 'Missing required fields: customerId, items, or deliveryAddress.');
        }

        // 2. Validate menu items and calculate total cost
        let totalCost = 0;
        const itemDetails = [];

        for (const item of items) {
            const menuItem = await MenuService.getMenuItemById(item.menuItemId);

            if (!menuItem) {
                throw new APIError(400, `Menu item with ID ${item.menuItemId} not found`);
            }

            // Calculate the total cost for the item (price * quantity)
            const itemTotal = menuItem.price * item.quantity;
            totalCost += itemTotal;

            // Add the item details to the list
            itemDetails.push({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price,
                total: itemTotal
            });
        }

        // 3. Save the order in the database
        const order = await OrderService.createOrder({
            customerId,
            items: itemDetails,
            totalCost,
            deliveryAddress,
            status: 'pending', // Set initial status to 'pending'
        });

        // 4. Return a success response
        res.status(201).json({
            message: 'Order created successfully',
            order,
        });
    
    } catch (error) {
        next(error); // Pass the error to the handling middleware
    }
}

/**
 * Get an order by ID.
 */
const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the order ID from the URL params

        // Fetch the order using the OrderService
        const order = await OrderService.getOrderById(id);

        if (!order) {
            return res.status(404).json({ message: `Order with ID ${id} not found.` });
        }

        // Return the order details
        return res.status(200).json({ message: 'Order fetched successfully', order });
    } catch (error) {
        next(error); // Pass the error to the handling middleware
    }
}

/**
 * Update an order by ID.
 */
const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the order ID from the URL params
        const updateData = req.body; // Get the updated order data from the request body

        // Update the order using the OrderService
        const updatedOrder = await OrderService.updateOrder(id, updateData);

        if (!updatedOrder) {
            return res.status(404).json({ message: `Order with ID ${id} not found.` });
        }

        // Return the updated order details
        return res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        next(error); // Pass the error to the handling middleware
    }
}

/**
 * Delete an order by ID.
 */
const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the order ID from the URL params

        // Delete the order using the OrderService
        const deletedOrder = await OrderService.deleteOrder(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: `Order with ID ${id} not found.` });
        }

        // Return a success message
        return res.status(200).json({ message: `Order with ID ${id} deleted successfully` });
    } catch (error) {
        next(error); // Pass the error to the handling middleware
    }
}

// Exporting all the methods
export default {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
};