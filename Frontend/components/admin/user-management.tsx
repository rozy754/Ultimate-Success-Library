"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, MessageCircle, Edit, Trash2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  plan: string
  status: "active" | "expired" | "expiring"
  startDate: string
  endDate: string
  totalPaid: number
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock user data
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      plan: "Monthly",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      totalPaid: 3000,
    },
    {
      id: "2",
      name: "Rahul Kumar",
      email: "rahul.kumar@email.com",
      phone: "+91 87654 32109",
      plan: "Weekly",
      status: "expiring",
      startDate: "2024-01-10",
      endDate: "2024-01-17",
      totalPaid: 1200,
    },
    {
      id: "3",
      name: "Anita Patel",
      email: "anita.patel@email.com",
      phone: "+91 76543 21098",
      plan: "Monthly",
      status: "expired",
      startDate: "2023-12-01",
      endDate: "2024-01-01",
      totalPaid: 5000,
    },
    {
      id: "4",
      name: "Vikash Singh",
      email: "vikash.singh@email.com",
      phone: "+91 65432 10987",
      plan: "Daily",
      status: "active",
      startDate: "2024-01-14",
      endDate: "2024-01-15",
      totalPaid: 200,
    },
    {
      id: "5",
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phone: "+91 54321 09876",
      plan: "Monthly",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      totalPaid: 2000,
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "expiring":
        return <Badge className="bg-orange-100 text-orange-800">Expiring Soon</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const generateWhatsAppMessage = (user: User) => {
    const message = `Hi ${user.name}! This is a reminder about your ${user.plan} library subscription. ${
      user.status === "expiring"
        ? `Your subscription expires on ${user.endDate}. Renew now to continue accessing our services.`
        : user.status === "expired"
          ? `Your subscription expired on ${user.endDate}. Renew now to regain access to our library services.`
          : "Thank you for being a valued member of our library!"
    }`
    return encodeURIComponent(message)
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>User Management</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription Period</TableHead>
                <TableHead>Total Paid</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{user.phone}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.plan}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{user.startDate}</p>
                      <p className="text-muted-foreground">to {user.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">₹{user.totalPaid.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://wa.me/91${user.phone.replace(/\D/g, "")}?text=${generateWhatsAppMessage(user)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "expiring").length}</div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "expired").length}</div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">₹{users.reduce((sum, u) => sum + u.totalPaid, 0).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
