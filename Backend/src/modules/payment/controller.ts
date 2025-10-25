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
    console.log("🍪 Cookies received:", req.cookies);
    console.log("🔐 User from auth middleware:", (req as any).user);
    
    const { plan, amount } = req.body;

    if (!amount || !plan) {
      return res.status(400).json({ error: "Missing plan or amount" });
    }

    console.log("📦 Creating order for:", { plan, amount });
    
    const order = await paymentService.createOrder(plan, amount);
    
    console.log("✅ Order created successfully:", order.id);
    
    res.json(order);
  } catch (error: any) {
    console.error("❌ Create order error:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
};

/**
 * Verify Razorpay payment and activate subscription
 */
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature, plan, duration, shift, seatType, amount, addOns } = req.body;
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    if (!orderId || !paymentId || !signature || !plan) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const isValid = paymentService.verifyPayment(orderId, paymentId, signature);
    
    if (!isValid) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const order = await paymentService.fetchOrderById(orderId);
    const amountRupees = Math.round(Number(order?.amount || 0) / 100);
    const currency = order?.currency || "INR";

    const startDate = new Date();
    const expiryDate = paymentService.calculateExpiryDate(duration || "1 Month");

    const subscription = await Subscription.create({
      userId,
      plan: plan,
      status: "Active",
      startDate,
      expiryDate,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
      duration,
      shift,
      seatType,
      amountPaid: amountRupees,
    });

    await User.findByIdAndUpdate(userId, { currentSubscription: subscription._id });

    const payment = await Payment.create({
      userId,
      orderId,
      paymentId,
      signature,
      amount: amountRupees,
      currency,
      status: "Success",
      plan,
      duration,
      shift,
      seatType,
      registrationIncluded: !!addOns?.registration,
      lockerIncluded: !!addOns?.locker,
    });

    return res.json({ 
      success: true, 
      message: "Payment verified", 
      subscription, 
      payment 
    });
  } catch (err: any) {
    console.error("❌ verifyPayment error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const history = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error: any) {
    console.error("❌ Payment history error:", error);
    res.status(500).json({ error: error.message });
  }
};