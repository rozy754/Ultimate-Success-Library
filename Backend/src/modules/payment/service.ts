import Razorpay from "razorpay";
import crypto from "crypto";
import env from "../../config/env";

if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
  console.error("❌ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing!");
  throw new Error("Razorpay credentials not configured");
}

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (plan: string, amount: number) => {
  console.log("💰 Creating Razorpay order:", { plan, amount });
  
  // Generate a short receipt ID (max 40 chars)
  const timestamp = Date.now();
  const receipt = `rcpt_${timestamp}`.substring(0, 40);
  
  const options = {
    amount: amount * 100, // Convert to paise
    currency: "INR",
    receipt: receipt,
    notes: { 
      plan,
      timestamp: timestamp.toString()
    },
  };
  
  const order = await razorpay.orders.create(options as any);
  console.log("✅ Order created:", order);
  
  return order;
};

export const verifyPayment = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  return expectedSignature === signature;
};

export function calculateExpiryDate(duration: string): Date {
  const start = new Date();
  const months = 
    duration === "1 Month" ? 1 : 
    duration === "3 Months" ? 3 : 
    duration === "7 Months" ? 7 : 1;
  const end = new Date(start);
  end.setMonth(end.getMonth() + months);

// TESTING MODE - Set custom durations
  // const start = new Date();
  // const end = new Date(start);
  // switch(duration) {
  //   case "1 Month":
  //     end.setMinutes(end.getMinutes() + 5); // 1 day
  //     break;
  //   case "3 Months":
  //     end.setMinutes(end.getMinutes() + 15); // 3 days
  //     break;
  //   case "7 Months":
  //     end.setMinutes(end.getMinutes() + 30); // 7 days
  //     break;
  //   default:
  //     end.setDate(end.getDate() + 1); // Default 1 day
  // }
  return end;
}

export const getPaymentHistory = async (_userId: string) => {
  return [];
};

export async function fetchOrderById(orderId: string) {
  return await (razorpay.orders as any).fetch(orderId);
}