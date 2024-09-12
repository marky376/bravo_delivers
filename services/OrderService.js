import { Order, OrderItem } from '../models';
import { APIError } from '../utils/APIError';

/**
 * Create a new order.
 * @param {Object} orderData - The order details
 * @returns {Promise<Order>} - The created order
 */
const createOrder = async (orderData) => {
    try {
        // Validate the order data
        if (!orderData.customerId || !orderData.items || !orderData.items.length || !orderData.deliveryAddress) {
            throw new APIError(400, 'Missing required fields: customerId, items, or deliveryAddress.');
        }

        // Calculate the total cost of the order
        let totalCost = 0;
        const itemDetails = [];

        for (const item of orderData.items) {
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
                total: itemTotal
            });
        }

        // Create the order with its items
        const order = await Order.create({
            customerId: orderData.customerId,
            totalCost,
            deliveryAddress: orderData.deliveryAddress,
            status: 'pending', // Set initial status to 'pending'
        });

        // Add items to the order
        await Promise.all(itemDetails.map(item => 
            OrderItem.create({
                orderId: order.id,
                ...item
            })
        ));

        return order;
    } catch (error) {
        throw new APIError(500, 'Error creating order: ' + error.message);
    }
};

/**
 * Get an order by ID.
 * @param {number} id - The ID of the order to fetch
 * @returns {Promise<Order>} - The fetched order
 */
const getOrderById = async (id) => {
    try {
        const order = await Order.findByPk(id, {
            include: [{ model: OrderItem }] // Include related OrderItems
        });

        if (!order) {
            throw new APIError(404, `Order with ID ${id} not found`);
        }

        return order;
    } catch (error) {
        throw new APIError(500, 'Error fetching order: ' + error.message);
    }
};

/**
 * Update an order by ID.
 * @param {number} id - The ID of the order to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<Order>} - The updated order
 */
const updateOrder = async (id, updateData) => {
    try {
        const [updated] = await Order.update(updateData, {
            where: { id },
            returning: true // Return the updated order
        });

        if (!updated) {
            throw new APIError(404, `Order with ID ${id} not found`);
        }

        return await getOrderById(id);
    } catch (error) {
        throw new APIError(500, 'Error updating order: ' + error.message);
    }
};

/**
 * Delete an order by ID.
 * @param {number} id - The ID of the order to delete
 * @returns {Promise<void>}
 */
const deleteOrder = async (id) => {
    try {
        const deleted = await Order.destroy({
            where: { id }
        });

        if (!deleted) {
            throw new APIError(404, `Order with ID ${id} not found`);
        }
    } catch (error) {
        throw new APIError(500, 'Error deleting order: ' + error.message);
    }
};

export default {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
