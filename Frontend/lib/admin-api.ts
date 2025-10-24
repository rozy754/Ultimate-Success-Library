import { api } from "./api";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "expired" | "expiring" | "No active plan";
  startDate: string | null;
  endDate: string | null;
  currentPlanAmount: number;
  totalPaid: number;
  daysRemaining: number;
  isExpiringSoon: boolean;
  createdAt: string;
}

export interface UserDetailsResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      createdAt: string;
    };
    currentSubscription: {
      plan: string;
      status: string;
      startDate: string;
      expiryDate: string;
      daysRemaining: number;
    } | null;
    totalPaid: number;
    paymentHistory: Array<{
      _id: string;
      amount: number;
      currency: string;
      status: string;
      plan: string;
      paymentId: string;
      orderId: string;
      createdAt: string;
    }>;
    subscriptionHistory: Array<{
      plan: string;
      status: string;
      startDate: string;
      expiryDate: string;
    }>;
  };
}

export interface AdminUsersResponse {
  success: boolean;
  data: {
    users: AdminUser[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      limit: number;
    };
  };
}

export const adminApi = {
  // Get all users with filters
  getUsers: (params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append("search", params.search);
    if (params?.status) searchParams.append("status", params.status);
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    return api.get<AdminUsersResponse>(
      `/admin/users${queryString ? `?${queryString}` : ""}`
    );
  },

  // Get user details
  getUserDetails: (userId: string) => {
    return api.get<UserDetailsResponse>(`/admin/users/${userId}`);
  },
};

adminApi.getUsers({ status: "expired" });
adminApi.getUsers({ status: "expiring" });