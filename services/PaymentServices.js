// services/PaymentService.js
import Payment from '../models/Payment.js'; // Assuming you have a Payment model

class PaymentService {
    // Process a payment
    static async processPayment(paymentData) {
        const newPayment = new Payment(paymentData);
        return await newPayment.save(); // Save the payment record to the database
    }

    // Retrieve a payment by ID
    static async getPaymentById(id) {
        return await Payment.findById(id); // Fetch payment by ID
    }

}

export default PaymentService;
