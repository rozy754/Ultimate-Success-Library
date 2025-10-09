"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Monitor, Users, ArrowRight } from "lucide-react"

type User = { name: string; email: string; role?: string }

export function ServicesSection() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const resp = await api.get<{ success: boolean; data: { user: User } }>("/auth/me")
        if (!cancelled) setUser(resp.data.user)
      } catch {
        if (!cancelled) {
          try {
            const ls = localStorage.getItem("user")
            if (ls) setUser(JSON.parse(ls))
          } catch {}
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const services = [
    {
      icon: BookOpen,
      title: "Library Services",
      description:
        "Access our extensive collection of books, study materials, and quiet study spaces. Track your progress and achieve your learning goals.",
      features: ["5000+ Books", "Study Rooms", "Progress Tracking", "Daily Goals"],
      status: "active",
      href: "/login",
    },
    {
      icon: Monitor,
      title: "Computer Classes",
      description:
        "Learn essential computer skills, programming languages, and software applications with hands-on training.",
      features: ["Programming", "Software Training", "Hands-on Labs", "Certification"],
      status: "coming-soon",
      href: "#",
    },
    {
      icon: Users,
      title: "Coaching Classes",
      description: "Personalized coaching sessions for competitive exams, career guidance, and skill development.",
      features: ["Personal Mentoring", "Exam Prep", "Career Guidance", "Skill Development"],
      status: "coming-soon",
      href: "#",
    },
  ]

  const libraryHref = user ? "/library" : "/login"

  return (
    <section id="services" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive educational services designed to support your learning journey and career advancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const href = service.title === "Library Services" ? libraryHref : service.href
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={service.status === "active" ? "default" : "outline"}
                    disabled={service.status === "coming-soon"}
                    asChild={service.status === "active"}
                  >
                    {service.status === "active" ? (
                      <Link href={href}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    ) : (
                      <>Coming Soon</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
