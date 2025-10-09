import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Create a new order on Razorpay
 * @param amount plan ka price (₹ me)
 * @param plan subscription type (Daily/Weekly/Monthly)
 */
export const createOrder = async (amount: number, plan: string) => {
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
export const calculateExpiryDate = (plan: string): Date => {
  const startDate = new Date();
  let expiryDate = new Date(startDate);

  switch (plan) {
    case "Daily Pass":
      expiryDate.setDate(startDate.getDate() + 1);
      break;
    case "Weekly Pass":
      expiryDate.setDate(startDate.getDate() + 7);
      break;
    case "Monthly Pass":
      expiryDate.setMonth(startDate.getMonth() + 1);
      break;
    default:
      throw new Error("Invalid subscription plan");
  }

  return expiryDate;
};
