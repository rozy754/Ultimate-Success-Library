"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Armchair, Plus, Minus, Users, TrendingUp } from "lucide-react"

export function SeatManagement() {
  const [totalSeats, setTotalSeats] = useState(150)
  const [occupiedSeats, setOccupiedSeats] = useState(127)
  const [newSeatCount, setNewSeatCount] = useState("")

  const occupancyRate = Math.round((occupiedSeats / totalSeats) * 100)
  const availableSeats = totalSeats - occupiedSeats

  const addSeats = () => {
    const count = Number.parseInt(newSeatCount)
    if (count > 0) {
      setTotalSeats(prev => prev + count)
      setNewSeatCount("")
    }
  }

  const removeSeats = () => {
    const count = Number.parseInt(newSeatCount)
    if (count > 0 && count <= availableSeats) {
      setTotalSeats(prev => prev - count)
      setNewSeatCount("")
    }
  }

  // Mock seat layout data
  const seatSections = [
    { name: "Reading Hall A", total: 50, occupied: 42 },
    { name: "Reading Hall B", total: 40, occupied: 35 },
    { name: "Study Rooms", total: 30, occupied: 25 },
    { name: "Computer Section", total: 20, occupied: 15 },
    { name: "Group Study Area", total: 10, occupied: 10 },
  ]

  const peakHours = [
    { time: "9:00 AM", occupancy: 85 },
    { time: "11:00 AM", occupancy: 95 },
    { time: "2:00 PM", occupancy: 78 },
    { time: "4:00 PM", occupancy: 92 },
    { time: "6:00 PM", occupancy: 88 },
    { time: "8:00 PM", occupancy: 65 },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Seats</CardTitle>
            <Armchair className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSeats}</div>
            <p className="text-xs text-muted-foreground">Available capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{occupiedSeats}</div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableSeats}</div>
            <p className="text-xs text-muted-foreground">Ready for use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <Progress value={occupancyRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Seat Management Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Seating Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Number of Seats</label>
              <Input
                type="number"
                placeholder="Enter number of seats"
                value={newSeatCount}
                onChange={(e) => setNewSeatCount(e.target.value)}
                min="1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addSeats} disabled={!newSeatCount || Number.parseInt(newSeatCount) <= 0}>
                <Plus className="h-4 w-4 mr-2" />
                Add Seats
              </Button>
              <Button 
                variant="outline" 
                onClick={removeSeats} 
                disabled={!newSeatCount || Number.parseInt(newSeatCount) <= 0 || Number.parseInt(newSeatCount) > availableSeats}
              >
                <Minus className="h-4 w-4 mr-2" />
                Remove Seats
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Note: You can only remove seats that are currently available (not occupied).
          </p>
        </CardContent>
      </Card>

      {/* Section-wise Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Section-wise Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seatSections.map((section, index) => {
              const sectionOccupancy = Math.round((section.occupied / section.total) * 100)
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{section.name}</h3>
                    <Badge variant={sectionOccupancy > 90 ? "destructive" : sectionOccupancy > 70 ? "default" : "secondary"}>
                      {sectionOccupancy}% Full
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {section.occupied}/{section.total} seats occupied
                    </span>
                    <span className="text-sm font-medium">
                      {section.total - section.occupied} available
                    </span>
                  </div>
                  <Progress value={sectionOccupancy} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Peak Hours Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Hours Analysis</CardTitle>
        </CardHeader>\
