const { createOrder, getOrderById, updateOrder, deleteOrder } = require('./services/OrderService');
const { Order, OrderItem } = require('../models');
const { sequelize } = require('../database');

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Create tables
});

afterAll(async () => {
    await sequelize.close();
});

test('should create an order', async () => {
    const orderData = {
        customerId: 1,
        items: [
            {menuItemId: 1, quantity: 2, price: 10, total:20},
        ],
        totalCost: 20,
        deliveryAddress: '123 Main St',
        status: 'pending',
    };

    const order = await createOrder(OrderData);
    expect(order).toHaveProperty('id');
    expect(order.totalCost).toBe(20);
});

test('should get an order by ID', async () => {
    const order = await Order.create({
        customerId: 1,
        totalCost: 20,
        deliveryAddress: '123 Main St',
        status: 'pending',
    
    });
    const fetchOrder = await getOrderById(order.id);
    expect(fetchedOrder.id).toBe(order.id);
});

test('should update an order', async () => {
    const order = await Order.create({
        customerId: 1,
        totalCost: 20,
        deliveryAddress: '123 Main St',
        status: 'pending',
    });
    const updateOrder = await updateOrder(order.id, { status: 'completed' });
    expect(updateOrder.status).toBe('completed');
});

test('should delete an order', async () => {
    const order = await Order.create({
        customerId: 1,
        totalCost: 20,
        deliveryAddress: '123 Main St',
        status: 'pending',
    });

    await deleteOrder(order.id);
    const fetchedOrder = await Order.findByP(order.id);
    expect(fetchedOrder).toBeNull();
});