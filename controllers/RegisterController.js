import UserService from '../services/UserService.js';

const RegisterController = {
    async registerUser(req, res, next) {
        try {
            const newUser = await UserService.register(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
};

// Export the RegisterController object itself
export default RegisterController;
