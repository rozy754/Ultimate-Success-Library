import { Request, Response } from "express";
import * as paymentService from "./service";
import Payment from "./model";
import Subscription from "../subscription/model";
import User from "../users/user.model";

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
    const { orderId, paymentId, signature, plan } = req.body
    const userId = (req as any).user?.id
    if (!userId) return res.status(401).json({ error: "Unauthorized" })
    if (!orderId || !paymentId || !signature || !plan)
      return res.status(400).json({ error: "Missing required fields" })

    const isValid = paymentService.verifyPayment(orderId, paymentId, signature)
    if (!isValid) return res.status(400).json({ error: "Invalid payment signature" })

    const order = await paymentService.fetchOrderById(orderId)
    const amountRupees = Math.round(Number(order?.amount || 0) / 100)
    const currency = order?.currency || "INR"

    const startDate = new Date()
    const expiryDate = paymentService.calculateExpiryDate(plan)

    const subscription = await Subscription.create({
      userId,
      plan,
      status: "Active",
      startDate,
      expiryDate,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
    })

    await User.findByIdAndUpdate(userId, { currentSubscription: subscription._id })

    const payment = await Payment.create({
      userId,
      orderId,
      paymentId,
      signature,
      amount: amountRupees,
      currency,
      status: "Success",
      plan,
    })
    console.log("✅ Payment record saved:", payment)

    return res.json({ success: true, message: "Payment verified", subscription, payment })
  } catch (err: any) {
    console.error("verifyPayment error:", err)
    return res.status(500).json({ error: err.message })
  }
};

// 5. Get payment history for the logged-in user
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.json({ history: payments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};