import { Button } from "@/components/ui/button"
import { KairosLogo } from "@/components/kairos-logo"
import { GeometricBackground, FadeUpAnimation } from "@/components/geometric-animations"
import Link from "next/link"
import { ArrowRight, Calendar, Code, Github, Globe, type LucideIcon, Star, Brain } from "lucide-react"

function FeatureCard({
  icon: Icon,
  title,
  description,
  emoji,
}: {
  icon: LucideIcon
  title: string
  description: string
  emoji?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border-0 bg-black p-6">
      <div
        className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 opacity-50"
        style={{ margin: "-1px" }}
      />
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold">
            {title} {emoji}
          </h3>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function StatsBar() {
  const stats = [
    { label: "Participants", value: "2,500+" },
    { label: "Countries", value: "45+" },
    { label: "Projects", value: "75,000+" },
    { label: "Code Reviews", value: "150,000+" },
  ]

  return (
    <div className="w-full overflow-hidden bg-primary/5 backdrop-blur-sm py-6 border-t border-b border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeUpAnimation key={index} delay={index * 0.2}>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </FadeUpAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <GeometricBackground className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-24 text-center">
          <FadeUpAnimation delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
              <KairosLogo size="sm" animated={false} />
              <span className="text-sm text-white/60 tracking-wide">30 Days of Code with VickyJay</span>
            </div>
          </FadeUpAnimation>

          <FadeUpAnimation delay={1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Code Every Day.
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white/90 to-secondary">
                Build Your Future.
              </span>
            </h1>
          </FadeUpAnimation>

          <FadeUpAnimation delay={2}>
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
              Join thousands of developers in the 30-day coding challenge. Submit projects daily, get feedback, and
              climb the leaderboard.
            </p>
          </FadeUpAnimation>

          <FadeUpAnimation delay={3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-futuristic">
                <Link href="/register">
                  Join the Challenge
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </FadeUpAnimation>
        </div>
      </GeometricBackground>

      {/* Stats Bar */}
      <StatsBar />

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            How Kairos Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kairos is more than just a coding challenge. It's a community of developers committed to growth and
            excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeUpAnimation delay={0}>
            <FeatureCard
              icon={Calendar}
              title="Challenge Overview"
              emoji="📝"
              description="The challenge spans thirty days, during which participants are expected to create and submit a diverse range of projects. These projects can include websites, web pages, coding tools, or any other relevant coding endeavor. The primary goal is to encourage consistent coding practice and innovation."
            />
          </FadeUpAnimation>

          <FadeUpAnimation delay={0.2}>
            <FeatureCard
              icon={Code}
              title="Submission Platform"
              emoji="📝"
              description="Participants will use the dedicated submission platform to upload their daily projects. This platform serves as a centralized hub for showcasing participants' work, allowing for easy navigation and exploration. Each submission will be tagged with relevant information, such as project type, coding language, and date."
            />
          </FadeUpAnimation>

          <FadeUpAnimation delay={0.4}>
            <FeatureCard
              icon={Brain}
              title="Participant Interaction"
              emoji="🧠"
              description="The challenge promotes a sense of community by enabling participants to view and rate each other's projects. This interaction enhances the learning experience, as participants can draw inspiration from their peers, exchange ideas, and celebrate achievements. The submission platform facilitates seamless communication among participants."
            />
          </FadeUpAnimation>

          <FadeUpAnimation delay={0.6}>
            <FeatureCard
              icon={Star}
              title="Rating System"
              emoji="⭐"
              description="Admins, representing the organizing body of the challenge, will play a crucial role in evaluating and rating the submitted projects. The rating criteria include factors such as creativity, functionality, code quality, and adherence to the daily theme or challenge prompt. Admins will provide constructive feedback to participants, fostering a learning environment."
            />
          </FadeUpAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <KairosLogo size="md" animated={false} />
                <span className="font-bold text-lg">Kairos</span>
              </div>
              <p className="text-muted-foreground mb-4">
                30 Days of Code with VickyJay - Building better developers through daily coding challenges.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/submissions" className="text-muted-foreground hover:text-primary transition-colors">
                    Submissions
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="divider-futuristic my-8" />

          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kairos. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

