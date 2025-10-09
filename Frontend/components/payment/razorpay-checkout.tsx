"use client"

import { Button } from "@/components/ui/button"
import { useRazorpayCheckout } from "../hooks/useRazorpayCheckout"

interface Props {
  plan: string
  amount: number
  label?: string
}

export default function RazorpayCheckout({ plan, amount, label = "Pay Now" }: Props) {
  const { startPayment } = useRazorpayCheckout()

  return (
    <Button onClick={() => startPayment(plan, amount)}>
      {label}
    </Button>
  )
}
