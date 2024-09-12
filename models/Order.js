const { DataTypes } = require('sequilize');
const { sequilize } = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    
}, {
    timestamp: true,
});

module.exports = Order;