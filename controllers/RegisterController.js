import UserService from '../services/UserService.js';

const registerUser = async (req, res, next) => {
    try {
        const newUser = await UserService.register(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
