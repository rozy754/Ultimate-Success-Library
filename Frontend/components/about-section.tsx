import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Lightbulb, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Ultimate Success Institute</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Founded with a vision to empower students and professionals, we provide comprehensive educational resources
            and personalized guidance to help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To create an inclusive learning environment where every individual can access quality education, develop
              essential skills, and build a successful career. We believe in nurturing talent and providing the tools
              necessary for personal and professional growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our institute combines traditional learning methods with modern technology to deliver an exceptional
              educational experience that prepares students for the challenges of tomorrow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Goal-Oriented</h4>
                <p className="text-sm text-muted-foreground">Focused approach to achieve your objectives</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Supportive</h4>
                <p className="text-sm text-muted-foreground">Caring environment for all learners</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Innovative</h4>
                <p className="text-sm text-muted-foreground">Modern teaching methods and technology</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Community</h4>
                <p className="text-sm text-muted-foreground">Strong network of learners and mentors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
