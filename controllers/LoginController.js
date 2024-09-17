import UserService from '../services/UserService.js';

const loginUser = async (req, res, next) => {
    try {
        const token = await UserService.login(req.body.email, req.body.password);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};
