"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, CreditCard, Calendar, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRazorpayCheckout } from "../hooks/useRazorpayCheckout"   // ✅ checkout hook
import { subscriptionApi, Subscription } from "@/lib/subscription-api"
import { paymentApi, PaymentHistoryItem } from "@/lib/payment-api"  // ✅ payment history placeholder

export function SubscriptionManager() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<PaymentHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { startPayment } = useRazorpayCheckout()

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        // ✅ fetch subscription
        const res = await subscriptionApi.getCurrentSubscription()
        setCurrentSubscription(res.data ?? null)

        // ✅ fetch billing history (placeholder until backend ready)
        try {
          const history = await paymentApi.getPaymentHistory()
          setBillingHistory(history ?? [])
        } catch {
          setBillingHistory([])
        }
      } catch (error) {
        console.error("Error fetching subscription data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch subscription info",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionData()
  }, [toast])

  const subscriptionPlans = [
    { name: "Daily Pass", price: 2, duration: "1 Day", features: ["Full Library Access", "Study Room", "Wi-Fi"], popular: false, savings: null },
    { name: "Weekly Pass", price: 300, duration: "7 Days", features: ["Full Library Access", "Study Room", "Wi-Fi", "Doubt Sessions"], popular: true, savings: "Save ₹50" },
    { name: "Monthly Pass", price: 1000, duration: "30 Days", features: ["Full Library Access", "Study Room", "Wi-Fi", "Doubt Sessions", "Progress Tracking"], popular: false, savings: "Save ₹300" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-2 bg-muted rounded w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progressPercentage = currentSubscription
    ? ((30 - (currentSubscription.daysRemaining ?? 0)) / 30) * 100
    : 0

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {currentSubscription ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{currentSubscription.plan}</h3>
                  <p className="text-muted-foreground">
                    Active from {currentSubscription.startDate} to {currentSubscription.expiryDate}
                  </p>
                </div>
                <Badge variant="default" className="w-fit">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {currentSubscription.status?.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subscription Progress</span>
                  <span className="font-medium">{currentSubscription.daysRemaining} days remaining</span>
                </div>
                <Progress value={progressPercentage} className="w-full" />
              </div>

              {currentSubscription.daysRemaining <= 7 && (
                <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <p className="text-sm text-orange-800">
                    Your subscription expires soon. Renew now to avoid interruption.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              No Active Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You don't have an active subscription. Choose a plan below to get started.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
          <p className="text-muted-foreground">Select the subscription plan that best fits your learning schedule</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-lg border transition-all ${
                  plan.popular ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                )}
                {plan.savings && (
                  <Badge variant="secondary" className="absolute -top-2 right-4">
                    {plan.savings}
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                  </div>
                  {currentSubscription?.plan === plan.name && (
                    <Badge variant="outline" className="mt-2">
                      Current Plan
                    </Badge>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => startPayment(plan.name, plan.price)}
                >
                  {currentSubscription?.plan === plan.name ? "Renew Plan" : "Subscribe Now"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-card">
              <h4 className="font-medium text-foreground mb-2">Secure Payment</h4>
              <p className="text-sm text-muted-foreground mb-4">
                All payments are processed securely. We accept all major credit cards, debit cards, and UPI payments.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>💳 Credit/Debit Cards</span>
                <span>📱 UPI</span>
                <span>🏦 Net Banking</span>
                <span>📱 Wallets</span>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-card">
              <h4 className="font-medium text-foreground mb-2">Billing History</h4>
              {billingHistory.length > 0 ? (
                <div className="space-y-2">
                  {billingHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{record.createdAt} - {record.plan}</span>
                      <span className="font-medium">₹{record.amount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No billing history available.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Renewal Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Auto-Renewal Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Auto-Renewal</h4>
              <p className="text-sm text-muted-foreground">Automatically renew your subscription before it expires</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto-renewal"
                className="rounded border-border text-primary focus:ring-primary"
                defaultChecked={false}
              />
              <label htmlFor="auto-renewal" className="text-sm font-medium">
                Enabled
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
