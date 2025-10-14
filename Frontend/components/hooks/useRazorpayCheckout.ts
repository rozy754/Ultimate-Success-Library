"use client"

import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useGlobalSpinner } from "@/components/ui/GlobalSpinner"
import { paymentApi } from "@/lib/payment-api"

declare global {
  interface Window {
    Razorpay: any
  }
}

export function useRazorpayCheckout() {
  const router = useRouter()
  const { toast } = useToast()
  const { show, hide } = useGlobalSpinner()

  const startPayment = async (planType: string, amount: number) => {
    try {
      show()

      // Convert amount from rupees to paisa (Razorpay expects smallest currency unit)
      const amountInPaisa = amount
      
      console.log("💰 Starting payment:", planType, "Amount in ₹:", amount, "Amount in paisa:", amountInPaisa)

      // Step 1: Create order
      const order = await paymentApi.createOrder(planType, amountInPaisa)
      console.log("📦 Order created:", order)

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded")
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ultimate Success Institute",
        description: `${planType} Subscription`,
        order_id: order.id,
        image: "https://razorpay.com/favicon.png",
        handler: async function (response: any) {
          try {
            // map Razorpay response -> backend expected shape and include plan
            const verifyPayload = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              plan: planType,
            }

            // Step 3: Verify payment
            await paymentApi.verifyPayment(verifyPayload)
            toast({ title: "Payment Successful 🎉" })
            router.push("/payment/success")
          } catch (err: any) {
            toast({ title: "Verification Failed", description: err.message, variant: "destructive" })
            router.push("/payment/failed")
          } finally {
            hide()
          }
        },
        modal: {
          ondismiss: function () {
            hide()
            router.push("/payment/failed")
          },
        },
        theme: { color: "#0f172a" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      toast({ title: "Payment Init Failed", description: err.message, variant: "destructive" })
      hide()
    }
  }

  return { startPayment }
}
