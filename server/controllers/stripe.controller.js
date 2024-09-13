// import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentMethod = async (req, res) => {
    const { planId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a Stripe Checkout session for subscription
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: planId, // The Stripe price ID for the plan
                    quantity: 1,
                },
            ],
            customer_email: user.email,  // Associate user email with Stripe
            success_url: `http://localhost:3000/payment-success`, // Replace with your front-end success URL
            cancel_url: `http://localhost:3000/payment-cancel`, // Replace with your front-end cancel URL
        });

        // Send success response to the frontend
        return res.status(200).json({
            success: true,
            message: 'Checkout session created successfully',
            id: session.id,
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);

        // Send error response to the frontend
        return res.status(500).json({
            success: false,
            message: 'Failed to create checkout session',
            error: error.message,
        });
    }
};