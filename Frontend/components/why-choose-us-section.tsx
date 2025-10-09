import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Snowflake, Clock, Users, BookOpen, Trophy, MapPin, Coffee } from "lucide-react"

export function WhyChooseUsSection() {
  const features = [
    {
      icon: Snowflake,
      title: "AC Rooms",
      description: "Climate-controlled study environment for maximum comfort",
    },
    {
      icon: Wifi,
      title: "High-Speed Wi-Fi",
      description: "Reliable internet connectivity for research and online learning",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Extended operating hours to fit your schedule",
    },
    {
      icon: Users,
      title: "Doubt Sessions",
      description: "Regular doubt clearing sessions with expert mentors",
    },
    {
      icon: BookOpen,
      title: "Extensive Library",
      description: "Vast collection of books and study materials",
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "95% success rate with personalized guidance",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Easily accessible location with good connectivity",
    },
    {
      icon: Coffee,
      title: "Refreshment Area",
      description: "Dedicated space for breaks and refreshments",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide world-class facilities and support to ensure your success. Here's what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
