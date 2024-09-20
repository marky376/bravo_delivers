import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const MenuItem = sequelize.define('MenuItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    timestamp: true,
});

export default MenuItem;