"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Users } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  subscriptionType: string
  expiryDate: string
  daysRemaining: number
}

export function WhatsAppReminders() {
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      subscriptionType: "Monthly",
      expiryDate: "2024-02-20",
      daysRemaining: 3,
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "9876543211",
      subscriptionType: "Weekly",
      expiryDate: "2024-02-18",
      daysRemaining: 1,
    },
    {
      id: "3",
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "9876543212",
      subscriptionType: "Daily",
      expiryDate: "2024-02-17",
      daysRemaining: 0,
    },
  ])

  const generateWhatsAppMessage = (student: Student) => {
    const message = `Hi ${student.name}! 👋

Your ${student.subscriptionType} subscription at Ultimate Success Institute is expiring ${student.daysRemaining === 0 ? "today" : `in ${student.daysRemaining} day${student.daysRemaining > 1 ? "s" : ""}`}.

Don't let your learning journey stop! Renew now to continue accessing:
✅ Premium study materials
✅ Progress tracking
✅ Personalized goals
✅ AC study rooms

Renew today and keep fueling your success! 🚀

Best regards,
Ultimate Success Institute Team`

    return encodeURIComponent(message)
  }

  const sendWhatsAppMessage = (student: Student) => {
    const message = generateWhatsAppMessage(student)
    const whatsappUrl = `https://wa.me/91${student.phone}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const sendBulkReminders = () => {
    students.forEach((student) => {
      setTimeout(() => sendWhatsAppMessage(student), 500)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">WhatsApp Reminders</h2>
          <p className="text-muted-foreground">Send renewal reminders to students with expiring subscriptions</p>
        </div>
        <Button onClick={sendBulkReminders} className="bg-green-600 hover:bg-green-700">
          <Send className="mr-2 h-4 w-4" />
          Send All Reminders
        </Button>
      </div>

      <div className="grid gap-4">
        {students.map((student) => (
          <Card key={student.id} className="border-l-4 border-l-rose-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>
                    {student.email} • +91 {student.phone}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      student.daysRemaining === 0 ? "destructive" : student.daysRemaining <= 2 ? "secondary" : "default"
                    }
                  >
                    {student.daysRemaining === 0 ? "Expired" : `${student.daysRemaining} days left`}
                  </Badge>
                  <Badge variant="outline">{student.subscriptionType}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <p>Expires: {student.expiryDate}</p>
                </div>
                <Button
                  onClick={() => sendWhatsAppMessage(student)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Reminder Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-destructive">
                {students.filter((s) => s.daysRemaining === 0).length}
              </p>
              <p className="text-sm text-muted-foreground">Expired Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {students.filter((s) => s.daysRemaining <= 2 && s.daysRemaining > 0).length}
              </p>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{students.length}</p>
              <p className="text-sm text-muted-foreground">Total Reminders</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
