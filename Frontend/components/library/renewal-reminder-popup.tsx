"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, X, CreditCard } from "lucide-react"
import Link from "next/link"

interface RenewalReminderPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function RenewalReminderPopup({ isOpen, onClose }: RenewalReminderPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-2 top-2">
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertCircle className="h-5 w-5" />
            Subscription Expiring Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-foreground mb-2">
              Your subscription is about to expire in <strong>8 days</strong>.
            </p>
            <p className="text-muted-foreground text-sm">
              Don't lose access to your learning progress and library resources.
            </p>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="font-medium text-foreground mb-2">Current Plan: Monthly Pass</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Full Library Access</li>
              <li>• Study Room</li>
              <li>• Wi-Fi & Doubt Sessions</li>
              <li>• Progress Tracking</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/library/subscription">
                <CreditCard className="h-4 w-4 mr-2" />
                Renew Now
              </Link>
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Remind Me Later
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            This reminder was sent by the admin to help you maintain uninterrupted access.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
