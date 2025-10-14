import { api } from "./api"

// ---------- Interfaces ----------
export interface OrderResponse {
  id: string
  amount: number
  currency: string
  receipt?: string
  status?: string
  [key: string]: any // fallback for unknown fields
}

export interface VerifyPaymentResponse {
  success: boolean
  message: string
  subscriptionId?: string
  [key: string]: any
}

export interface PaymentHistoryItem {
  id: string
  amount: number
  status: string
  createdAt: string
  [key: string]: any
}

// ---------- API Functions ----------
export const paymentApi = {
  createOrder: async (planType: string, amount: number): Promise<OrderResponse> => {
    console.log("🔗 API createOrder called with:", { planType, amount })
    return api.post<OrderResponse>("/payment/create-order", { plan: planType, amount })
  },

  // Accept backend-shaped payload ({ orderId, paymentId, signature, plan })
  verifyPayment: async (paymentData: {
    orderId?: string
    paymentId?: string
    signature?: string
    // accept old razorpay_* keys too if needed
    razorpay_order_id?: string
    razorpay_payment_id?: string
    razorpay_signature?: string
    plan?: string
  }): Promise<VerifyPaymentResponse> => {
    // normalize to backend expected keys
    const payload = {
      orderId: paymentData.orderId ?? paymentData.razorpay_order_id,
      paymentId: paymentData.paymentId ?? paymentData.razorpay_payment_id,
      signature: paymentData.signature ?? paymentData.razorpay_signature,
      plan: paymentData.plan,
    }
    return api.post<VerifyPaymentResponse>("/payment/verify", payload)
  },

  // placeholder until backend route exists
  getPaymentHistory: async (): Promise<PaymentHistoryItem[]> => {
    return api.get<PaymentHistoryItem[]>("/payment/history")
  },
}
