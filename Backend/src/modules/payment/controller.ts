import { Request, Response } from "express";
import * as paymentService from "./service";
import Subscription from "../subscription/model"; // ✅ tumhare subscription model ka import
import User from "../users/user.model"; // ✅ user ko update karne ke liye

/**
 * Create a new Razorpay order
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    // ✅ Debug: Check if cookies are present
    console.log("🍪 Cookies received:", req.cookies);
    console.log("🔐 User from auth middleware:", (req as any).user);
    
    const { plan, amount } = req.body;

    if (!amount || !plan) {
      return res.status(400).json({ error: "Amount and plan are required" });
    }

    const order = await paymentService.createOrder(plan,amount);
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Verify Razorpay payment and activate subscription
 */
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature, plan } = req.body;
    const userId = (req as any).user?.id; // ✅ JWT middleware se aayega

    if (!orderId || !paymentId || !signature || !plan) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ 1. Verify payment
    const isValid = paymentService.verifyPayment(orderId, paymentId, signature);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // ✅ 2. Calculate expiry date
    const startDate = new Date();
    const expiryDate = paymentService.calculateExpiryDate(plan);

    // ✅ 3. Save subscription in DB
    const subscription = await Subscription.create({
      userId,
      plan,
      status: "Active",
      startDate,
      expiryDate,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
    });

    // ✅ 4. Update user with current subscription
    await User.findByIdAndUpdate(userId, { currentSubscription: subscription._id });

    res.json({
      success: true,
      message: "Payment verified & subscription activated",
      subscription,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

  // 5.Get payment history for the logged-in user
 
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const subscriptions = await Subscription.find({ userId }).sort({ startDate: -1 });
    res.json({ history: subscriptions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};