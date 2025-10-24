import Razorpay from "razorpay";
import * as crypto from "crypto";
import Payment from "./model";

// create (or reuse) your Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

/**
 * Create a new order on Razorpay
 * @param amount plan ka price (₹ me)
 * @param plan subscription type (Daily/Weekly/Monthly)
 */
export const createOrder = async ( plan: string,amount: number) => {
  const options = {
    amount: amount * 100, // INR -> paise
    currency: "INR",
    receipt: `receipt_${plan}_${Date.now()}`,
    notes: { plan }, // ✅ order ke sath plan bhi store
  };

  return await razorpay.orders.create(options);
};

/**
 * Verify payment signature from Razorpay
 * @param orderId Razorpay order id
 * @param paymentId Razorpay payment id
 * @param signature Razorpay signature
 */
export const verifyPayment = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  // if (process.env.NODE_ENV === "development") {
  //   console.log("⚠️ MOCK MODE: Skipping signature verification");
  //   return true;
  // }
  const sign = orderId + "|" + paymentId;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(sign.toString())
    .digest("hex");

  return signature === expectedSign;
  //  return true; // yh postman mai test krne ke lie thaa !
};

/**
 * Calculate subscription expiry date based on plan
 * @param plan subscription type
 */
export function calculateExpiryDate(plan: string): Date {
  const d = new Date()
  if (plan === "Daily Pass") d.setDate(d.getDate() + 1)
  else if (plan === "Weekly Pass") d.setDate(d.getDate() + 7)
  else if (plan === "Monthly Pass") d.setMonth(d.getMonth() + 1)
  else d.setDate(d.getDate() + 1)
  return d
};

/**
 * Get payment history for a user
 * @param userId User's unique identifier
 */
export const getPaymentHistory = async (userId: string) => {
  return await Payment.find({ userId }).sort({ createdAt: -1 }).lean();
};

// Fetch order by id (amount in paise from Razorpay)
export async function fetchOrderById(orderId: string) {
  const order = await razorpay.orders.fetch(orderId);
  return order; // includes amount (paise), currency, status
}