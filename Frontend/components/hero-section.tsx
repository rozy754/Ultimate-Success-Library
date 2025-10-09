"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Trophy } from "lucide-react"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

type User = { name: string; email: string; role?: string }

export function HeroSection() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const resp = await api.get<{ success: boolean; data: { user: User } }>("/auth/me")
        if (!cancelled) setUser(resp.data.user)
      } catch {
        // fallback localStorage if you still store user there
        if (!cancelled) {
          try {
            const ls = localStorage.getItem("user")
            if (ls) setUser(JSON.parse(ls))
          } catch {}
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const handleGetStarted = () => {
    if (user) {
      const el = document.getElementById("services")
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        // if services section isn't on this view, navigate to it on home
        router.push("/#services")
      }
    } else {
      router.push("/signup")
    }
  }

  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/elegant-library.png')` }}
      />
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-foreground mb-6">Ultimate Success Institute</h1>
          <p className="text-xl md:text-2xl font-sans font-medium text-primary mb-8 max-w-3xl mx-auto">
            Fueling Your Success, One Step at a Time
          </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers through our comprehensive library services,
            computer classes, and personalized coaching programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={handleGetStarted}
              disabled={loading}
            >
              {user ? "Explore Services" : "Get Started Today"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
              <a href="#about">Learn More</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-foreground">5000+</h3>
              <p className="text-muted-foreground">Books Available</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-secondary/10 dark:bg-secondary/20 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-foreground">2000+</h3>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-foreground">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
