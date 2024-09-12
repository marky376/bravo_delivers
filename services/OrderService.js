import { APIError } from '../helpers/APIError';
let orders = []; // This will simulate a database for orders, replace with actual db logic later.


const generateOrderId = () => Math.random().toString(36).substring(2, 9);

/**
 * Create a new order.
 */

const createOrder = async (orderDate) => {
    try {
        const newOrder = {
            id: generateOrderId(),
            ...OrderData,
            createdAt: new Date(),
        };

        orders.push(newOrder);
        return newOrder;

    } catch (error) {
        throw new APIError(500, 'Error creating order');
    }
}

/**
 * Get an order by ID.
 */
const getOrderById = async (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) {
        throw new APIError(404, `Order with ID ${id} not found`);

    }
    return order;
}

/**
 * Update an order by ID.
 */

const updateOrder = async (id, updateData) => {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) {
        throw new APIError(404, `Order with ID ${id} not found`);

    }

    orders[index] = {
        ...orders[index],
        ...updateData,
        updatedAt: new Date(),
    };

    return orders[index];
}

/**
 * Delete an order by ID.
 */

const deleteOrder = async (id) => {
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) {
        throw new APIError(404, `Order with ID ${id} not found`);
    }

    const deletedOrder = orders.splice(index, 1);
    return deletedOrder;

}

export default {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
}