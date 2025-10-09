"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Flame, Target, TrendingUp } from "lucide-react"

export function ProgressTracker() {
  const [progressData, setProgressData] = useState<{ [key: string]: boolean }>({})
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [totalCompletedDays, setTotalCompletedDays] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch real progress data from API
    const fetchProgressData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/student/progress')
        // const data = await response.json()
        
        // For now, initialize empty state
        setProgressData({})
        setCurrentStreak(0)
        setLongestStreak(0)
        setTotalCompletedDays(0)
      } catch (error) {
        console.error('Error fetching progress data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgressData()
  }, [])

  const generateCalendarGrid = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const months = []

    for (let month = 0; month < 12; month++) {
      const monthName = new Date(currentYear, month).toLocaleString("default", { month: "short" })
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate()
      const firstDayOfMonth = new Date(currentYear, month, 1).getDay()

      const days = []

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="w-3 h-3" />)
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day)
        const dateString = date.toISOString().split("T")[0]
        const isCompleted = progressData[dateString] || false
        const isFuture = date > currentDate

        days.push(
          <div
            key={day}
            className={`w-3 h-3 rounded-sm border ${
              isFuture
                ? "bg-muted border-muted"
                : isCompleted
                  ? "bg-primary border-primary"
                  : "bg-background border-border hover:border-muted-foreground"
            }`}
            title={`${date.toDateString()}: ${isFuture ? "Future" : isCompleted ? "Completed" : "Not completed"}`}
          />,
        )
      }

      months.push(
        <div key={month} className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">{monthName}</h4>
          <div className="grid grid-cols-7 gap-1">{days}</div>
        </div>,
      )
    }

    return months
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const totalDaysTracked = Object.keys(progressData).length
  const completionRate = totalDaysTracked > 0 ? Math.round((totalCompletedDays / totalDaysTracked) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Longest Streak</p>
                <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Days</p>
                <p className="text-2xl font-bold text-foreground">{totalCompletedDays}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">{completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {new Date().getFullYear()} Progress Overview
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-background border border-border rounded-sm" />
              <span>No activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span>Goals completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted rounded-sm" />
              <span>Future</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {totalDaysTracked === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Progress Data Yet</h3>
              <p className="text-muted-foreground">Start tracking your daily goals to see your progress here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {generateCalendarGrid()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`flex items-center gap-3 p-4 border border-border rounded-lg ${currentStreak >= 7 ? '' : 'opacity-50'}`}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Streak Master</h4>
                <p className="text-sm text-muted-foreground">7+ day streak</p>
              </div>
              <Badge variant={currentStreak >= 7 ? "default" : "outline"}>
                {currentStreak >= 7 ? "Earned" : "Locked"}
              </Badge>
            </div>

            <div className={`flex items-center gap-3 p-4 border border-border rounded-lg ${totalCompletedDays >= 50 ? '' : 'opacity-50'}`}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Goal Crusher</h4>
                <p className="text-sm text-muted-foreground">50+ completed days</p>
              </div>
              <Badge variant={totalCompletedDays >= 50 ? "default" : "outline"}>
                {totalCompletedDays >= 50 ? "Earned" : "Locked"}
              </Badge>
            </div>

            <div className={`flex items-center gap-3 p-4 border border-border rounded-lg ${totalCompletedDays >= 100 ? '' : 'opacity-50'}`}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Century Club</h4>
                <p className="text-sm text-muted-foreground">100+ completed days</p>
              </div>
              <Badge variant={totalCompletedDays >= 100 ? "default" : "outline"}>
                {totalCompletedDays >= 100 ? "Earned" : "Locked"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
