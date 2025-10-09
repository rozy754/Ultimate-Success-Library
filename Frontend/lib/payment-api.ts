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
    // ✅ Fix: Change 'planType' to 'plan' to match backend expectation
    return api.post<OrderResponse>("/payment/create-order", { plan: planType, amount })
  },

  verifyPayment: async (paymentData: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }): Promise<VerifyPaymentResponse> => {
    return api.post<VerifyPaymentResponse>("/payment/verify", paymentData)
  },

  // placeholder until backend route exists
  getPaymentHistory: async (): Promise<PaymentHistoryItem[]> => {
    return api.get<PaymentHistoryItem[]>("/payment/history")
  },
}
