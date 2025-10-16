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
  createOrder: async (plan: string, amount: number): Promise<OrderResponse> => {
    console.log("🔗 API createOrder called with:", { plan, amount })
    return api.post<OrderResponse>("/payment/create-order", { plan, amount })
  },

  // Accept backend-shaped payload ({ orderId, paymentId, signature, plan })
  verifyPayment: async (paymentData: {
    orderId?: string
    paymentId?: string
    signature?: string
    plan?: string
  }): Promise<VerifyPaymentResponse> => {
    // normalize to backend expected keys
    const payload = {
      orderId: paymentData.orderId,
      paymentId: paymentData.paymentId,
      signature: paymentData.signature,
      plan: paymentData.plan,
    }
    return api.post<VerifyPaymentResponse>("/payment/verify", payload)
  },

  // placeholder until backend route exists
  getPaymentHistory: async (): Promise<PaymentHistoryItem[]> => {
    return api.get<PaymentHistoryItem[]>("/payment/history")
  },
}
