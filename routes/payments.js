import express from 'express';
import Stripe from 'stripe';


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        // Creating a payment intent with the order amount

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;