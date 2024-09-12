/**
 * Checks if an email is valid using a simplex regex pattern.
 */

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Checks if a password meets the basic requirements (length, complexity).
 */

const isValidPassword = (password) => {
    return password && password.length >= 6;
}

/**
 * Validates if required fields are present in the request body.
 */

const validateFields = (fields, body) => {
    const missingFields = fields.filter(field => !body[field]);
    if (missingFields.length > 0) {
        return `Missing required fields: ${missingFields.join(', ')}`;
    }
    return null;
}

export { isValidEmail, isValidPassword, validateFields };