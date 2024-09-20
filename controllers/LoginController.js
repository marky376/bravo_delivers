import UserService from '../services/UserService.js';

const LoginController = {
    /**
     * Log in a user.
     */
    async loginUser(req, res, next) {
        try {
            const token = await UserService.login(req.body.email, req.body.password);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
};

// Export the LoginController object
export default LoginController;
