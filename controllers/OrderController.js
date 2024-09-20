import express from 'express';
import MenuService from '../services/MenuService.js'; // Ensure correct import
import OrderService from '../services/OrderService.js'; // Ensure correct import
import { APIError } from '../middlewares/error.js';


const OrderController = {
    /**
     * Create a new order.
     */
    async createOrder(req, res, next) {
        try {
            const { customerId, items, deliveryAddress } = req.body;

            if (!customerId || !items || !items.length || !deliveryAddress) {
                throw new APIError(400, 'Missing required fields: customerId, items, or deliveryAddress.');
            }

            let totalCost = 0;
            const itemDetails = [];

            for (const item of items) {
                const menuItem = await MenuService.getMenuItemById(item.menuItemId);

                if (!menuItem) {
                    throw new APIError(400, `Menu item with ID ${item.menuItemId} not found`);
                }

                const itemTotal = menuItem.price * item.quantity;
                totalCost += itemTotal;

                itemDetails.push({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    price: menuItem.price,
                    total: itemTotal,
                });
            }

            const order = await OrderService.createOrder({
                customerId,
                items: itemDetails,
                totalCost,
                deliveryAddress,
                status: 'pending',
            });

            res.status(201).json({
                message: 'Order created successfully',
                order,
            });
        } catch (error) {
            next(error); // Pass the error to the handling middleware
        }
    },

    /**
     * Get an order by ID.
     */
    async getOrder(req, res, next) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(id);

            if (!order) {
                return res.status(404).json({ message: `Order with ID ${id} not found.` });
            }

            return res.status(200).json({ message: 'Order fetched successfully', order });
        } catch (error) {
            next(error); // Pass the error to the handling middleware
        }
    },

    /**
     * Update an order by ID.
     */
    async updateOrder(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedOrder = await OrderService.updateOrder(id, updateData);

            if (!updatedOrder) {
                return res.status(404).json({ message: `Order with ID ${id} not found.` });
            }

            return res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
        } catch (error) {
            next(error); // Pass the error to the handling middleware
        }
    },

    /**
     * Delete an order by ID.
     */
    async deleteOrder(req, res, next) {
        try {
            const { id } = req.params;

            const deletedOrder = await OrderService.deleteOrder(id);

            if (!deletedOrder) {
                return res.status(404).json({ message: `Order with ID ${id} not found.` });
            }

            return res.status(200).json({ message: `Order with ID ${id} deleted successfully` });
        } catch (error) {
            next(error); // Pass the error to the handling middleware
        }
    },
};

// Export the OrderController object
export default OrderController;

