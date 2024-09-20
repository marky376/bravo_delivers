// services/UserService.js
import User from '../models/User.js'; // Assuming you have a User model
import bcrypt from 'bcrypt';

class UserService {
    // Register a new user
    static async register(userData) {
        const { username, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        return await newUser.save(); // Save the new user to the database
    }

    // Find a user by username
    static async findUserByUsername(username) {
        return await User.findOne({ username }); // Fetch user by username
    }

}

export default UserService;
