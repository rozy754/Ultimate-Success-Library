"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyRevenue = [
  { month: "Jan", revenue: 45000, students: 150 },
  { month: "Feb", revenue: 52000, students: 173 },
  { month: "Mar", revenue: 48000, students: 160 },
  { month: "Apr", revenue: 61000, students: 203 },
  { month: "May", revenue: 55000, students: 183 },
  { month: "Jun", revenue: 67000, students: 223 },
]

const subscriptionBreakdown = [
  { name: "Monthly", value: 60, revenue: 36000, color: "#e11d48" },
  { name: "Weekly", value: 25, revenue: 15000, color: "#f97316" },
  { name: "Daily", value: 15, revenue: 9000, color: "#eab308" },
]

const dailyRevenue = [
  { day: "Mon", amount: 8500 },
  { day: "Tue", amount: 9200 },
  { day: "Wed", amount: 7800 },
  { day: "Thu", amount: 10100 },
  { day: "Fri", amount: 11500 },
  { day: "Sat", amount: 12800 },
  { day: "Sun", amount: 6900 },
]

export function RevenueCharts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Revenue Analytics</h2>
        <p className="text-muted-foreground">Comprehensive revenue tracking and insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue and student growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `₹${value.toLocaleString()}` : value,
                    name === "revenue" ? "Revenue" : "Students",
                  ]}
                />
                <Bar dataKey="revenue" fill="#e11d48" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Revenue breakdown by subscription type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {subscriptionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue Pattern</CardTitle>
            <CardDescription>Daily revenue distribution this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="amount" stroke="#e11d48" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                <span className="font-medium">Total Monthly Revenue</span>
                <span className="text-xl font-bold text-rose-600">₹67,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">Average Revenue per Student</span>
                <span className="text-xl font-bold text-orange-600">₹300</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">Growth Rate</span>
                <span className="text-xl font-bold text-yellow-600">+21.8%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Active Subscriptions</span>
                <span className="text-xl font-bold text-green-600">223</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
