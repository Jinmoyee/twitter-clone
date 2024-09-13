import express from "express"
import { paymentMethod } from "../controllers/stripe.controller.js"
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router()

router.post("/create-checkout-session", verifyToken, paymentMethod)

export default router