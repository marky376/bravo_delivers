import { APIError } from '../utils/error';
import { Order } from '../models'; // Import your Order model

/**
 * Create a new order.
 * @param {Object} orderData - Data for creating a new order
 * @returns {Promise<Object>} - The created order
 */
const createOrder = async (orderData) => {
    try {
        const newOrder = await Order.create({
            ...orderData,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return newOrder;
    } catch (error) {
        throw new APIError(500, 'Error creating order');
    }
};

/**
 * Get an order by ID.
 * @param {string} id - The ID of the order to fetch
 * @returns {Promise<Object>} - The fetched order
 */
const getOrderById = async (id) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new APIError(404, `Order with ID ${id} not found`);
        }

        return order;
    } catch (error) {
        throw new APIError(500, 'Error fetching order');
    }
};

/**
 * Update an order by ID.
 * @param {string} id - The ID of the order to update
 * @param {Object} updateData - Data to update the order with
 * @returns {Promise<Object>} - The updated order
 */
const updateOrder = async (id, updateData) => {
    try {
        const [affectedRows, [updatedOrder]] = await Order.update(updateData, {
            where: { id },
            returning: true
        });

        if (affectedRows === 0) {
            throw new APIError(404, `Order with ID ${id} not found`);
        }

        return updatedOrder;
    } catch (error) {
        throw new APIError(500, 'Error updating order');
    }
};

/**
 * Delete an order by ID.
 * @param {string} id - The ID of the order to delete
 * @returns {Promise<Object>} - The deleted order
 */
const deleteOrder = async (id) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new APIError(404, `Order with ID ${id} not found`);
        }

        await Order.destroy({ where: { id } });

        return order;
    } catch (error) {
        throw new APIError(500, 'Error deleting order');
    }
};

export default {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
