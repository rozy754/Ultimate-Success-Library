"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Tech Corp",
      content:
        "The library services at Ultimate Success Institute transformed my study routine. The progress tracking feature kept me motivated, and I successfully cleared my competitive exams.",
      rating: 5,
      image: "/professional-indian-woman-smiling.png",
    },
    {
      name: "Rahul Kumar",
      role: "Data Analyst",
      company: "Analytics Pro",
      content:
        "Excellent facilities and supportive environment. The AC rooms and Wi-Fi made studying comfortable. The doubt clearing sessions were incredibly helpful.",
      rating: 5,
      image: "/professional-indian-man-smiling.png",
    },
    {
      name: "Anita Patel",
      role: "MBA Student",
      company: "IIM Graduate",
      content:
        "The personalized coaching and extensive library resources helped me achieve my MBA dreams. The mentors are knowledgeable and always available to help.",
      rating: 5,
      image: "/professional-indian-woman.png",
    },
    {
      name: "Vikash Singh",
      role: "Civil Services",
      company: "IAS Officer",
      content:
        "Ultimate Success Institute provided the perfect environment for my UPSC preparation. The quiet study spaces and comprehensive resources were exactly what I needed.",
      rating: 5,
      image: "/professional-indian-businessman.png",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Student Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our successful students who achieved their goals with our support.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Quote className="h-8 w-8 text-primary mb-4 mx-auto md:mx-0" />
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
