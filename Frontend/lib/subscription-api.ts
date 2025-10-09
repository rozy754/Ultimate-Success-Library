import { api } from "./api"

// ---------- Interfaces ----------
export interface Subscription {
  id: string
  plan: string
  status: string
  startDate?: string
  expiryDate?: string
  [key: string]: any
}

export interface SubscriptionResponse {
  success: boolean
  data?: Subscription
  message?: string
  [key: string]: any
}

// ---------- API Functions ----------
export const subscriptionApi = {
  getCurrentSubscription: async (): Promise<SubscriptionResponse> => {
    return api.get<SubscriptionResponse>("/subscription/current")
  },

  createSubscription: async (planData: { planType: string; duration?: number }): Promise<SubscriptionResponse> => {
    return api.post<SubscriptionResponse>("/subscription", planData)
  },

  renewSubscription: async (subscriptionId: string): Promise<SubscriptionResponse> => {
    return api.post<SubscriptionResponse>(`/subscription/${subscriptionId}/renew`)
  },

  cancelSubscription: async (subscriptionId: string): Promise<SubscriptionResponse> => {
    return api.put<SubscriptionResponse>(`/subscription/${subscriptionId}/status`, {
      status: "cancelled",
    })
  },
}
