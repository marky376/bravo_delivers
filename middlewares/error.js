// APIError class to handle API-specific errors.

class APIError extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

//Function to generate a standadized error response.
const errorResponse = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || null;


    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        errors,

    });
}

export { APIError, errorResponse };