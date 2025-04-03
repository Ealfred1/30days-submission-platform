"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KairosLogo } from "@/components/kairos-logo"
import { Github, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { GeometricBackground, FadeUpAnimation } from "@/components/geometric-animations"
import { toast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, user } = useAuth()
  const router = useRouter()

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(true)
    try {
      await signIn(provider)
      router.push("/dashboard")
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: "Authentication failed",
        description: "There was a problem signing you up. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return null // Don't render anything while redirecting
  }

  return (
    <GeometricBackground className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        <FadeUpAnimation delay={0} className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <KairosLogo size="md" />
            <span className="font-bold text-xl">Kairos</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-center">Create an account</h1>
          <p className="text-sm text-muted-foreground text-center">Join the 30 Days of Code challenge with VickyJay</p>
        </FadeUpAnimation>

        <FadeUpAnimation delay={1}>
          <Card className="glass-card border-border/30">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>Choose your preferred sign up method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Button
                  className="w-full gap-2"
                  variant="outline"
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Sign up with Google
                </Button>

                <Button
                  className="w-full gap-2"
                  variant="outline"
                  onClick={() => handleOAuthSignIn("github")}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
                  Sign up with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" className="input-futuristic" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="name@example.com" className="input-futuristic" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" className="input-futuristic" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" className="input-futuristic" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full btn-futuristic" onClick={() => handleOAuthSignIn("google")}>
                Create Account
              </Button>
            </CardFooter>
          </Card>
        </FadeUpAnimation>

        <FadeUpAnimation delay={2} className="mt-4">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </FadeUpAnimation>
      </div>
    </GeometricBackground>
  )
}

