// auth.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js'; // Ensure the User model exists and the path is correct

// Configure the local strategy for passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find the user by username
            const user = await User.findOne({ where: { username } });

            // Check if user exists and password is correct
            if (!user || !(await user.comparePassword(password))) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            // Successful authentication
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);  // Serialize user ID into session
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);  // Find user by ID
        done(null, user);  // Pass the user back
    } catch (error) {
        done(error);
    }
});

// Export the initialized passport
export default passport;
