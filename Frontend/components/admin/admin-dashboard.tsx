"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, Calendar, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AdminDashboard() {
  // Mock data - in real app, this would come from API
  const stats = {
    totalRevenue: 125000,
    monthlyRevenue: 45000,
    activeStudents: 234,
    expiringSubscriptions: 18,
    totalSeats: 150,
    occupiedSeats: 127,
    newSignups: 12,
    renewalRate: 85,
  }

  const recentActivities = [
    { type: "signup", user: "Priya Sharma", action: "New monthly subscription", time: "2 hours ago" },
    { type: "renewal", user: "Rahul Kumar", action: "Renewed weekly plan", time: "4 hours ago" },
    { type: "expiry", user: "Anita Patel", action: "Subscription expired", time: "6 hours ago" },
    { type: "signup", user: "Vikash Singh", action: "New daily pass", time: "8 hours ago" },
  ]

  const expiringToday = [
    { name: "John Doe", plan: "Monthly", phone: "+91 98765 43210" },
    { name: "Jane Smith", plan: "Weekly", phone: "+91 87654 32109" },
    { name: "Mike Johnson", plan: "Monthly", phone: "+91 76543 21098" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of library operations and performance metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">+{stats.newSignups} new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seat Occupancy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((stats.occupiedSeats / stats.totalSeats) * 100)}%</div>
            <Progress value={(stats.occupiedSeats / stats.totalSeats) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.occupiedSeats}/{stats.totalSeats} seats
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.expiringSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "signup"
                          ? "bg-green-100"
                          : activity.type === "renewal"
                            ? "bg-blue-100"
                            : "bg-orange-100"
                      }`}
                    >
                      {activity.type === "signup" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === "renewal" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      {activity.type === "expiry" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Revenue Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Revenue chart will be displayed here</p>
                  <p className="text-sm text-muted-foreground">
                    Current month: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(stats.monthlyRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/admin/seats">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Seat Management
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/admin/reminders">
                  <Calendar className="mr-2 h-4 w-4" />
                  Send Reminders
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Expiring Today */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Expiring Today</CardTitle>
                <Badge variant="destructive">{expiringToday.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringToday.map((student, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-destructive/5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{student.name}</p>
                      <Badge variant="outline">{student.plan}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{student.phone}</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                      <a
                        href={`https://wa.me/91${student.phone.replace(/\D/g, "")}?text=Hi ${student.name}! Your ${student.plan} subscription expires today. Renew now to continue accessing our library services.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Send WhatsApp Reminder
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Renewal Rate</span>
                <span className="font-medium">{stats.renewalRate}%</span>
              </div>
              <Progress value={stats.renewalRate} />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Seat Utilization</span>
                <span className="font-medium">{Math.round((stats.occupiedSeats / stats.totalSeats) * 100)}%</span>
              </div>
              <Progress value={(stats.occupiedSeats / stats.totalSeats) * 100} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
