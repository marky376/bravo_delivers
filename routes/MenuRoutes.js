import express from 'express';
import MenuController from '../controllers/MenuController.js';

const MenuRoutes = express.Router();

MenuRoutes.get('/menu', MenuController.getMenu);
MenuRoutes.get('/menu/:id', MenuController.getMenuItem);
MenuRoutes.post('/menu', MenuController.addMenuItem);
MenuRoutes.put('/menu/:id', MenuController.updateMenuItem);
MenuRoutes.delete('/menu/:id', MenuController.deleteMenuItem);

export default MenuRoutes;