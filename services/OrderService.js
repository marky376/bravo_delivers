import Order from '../models/Order.js';

class OrderService {
    // Create a new order
    static async createOrder(orderData) {
        const newOrder = new Order(orderData);
        return await newOrder.save();
    }

    // Get an order by ID
    static async getOrderById(id) {
        return await Order.findById(id);
    }

    // Update an order by ID
    static async updateOrder(id, updateData) {
        return await Order.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Delete an order by ID
    static async deleteOrder(id) {
        return await Order.findByIdAndDelete(id);
    }
}

export default OrderService;