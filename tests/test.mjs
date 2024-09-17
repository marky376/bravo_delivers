import APIError from '../utils/APIError.mjs';

const testError = new APIError(400, 'Test error');
console.log(testError);
