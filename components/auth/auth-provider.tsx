"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (provider: "google" | "github") => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Simulate loading user data
  useEffect(() => {
    const loadUser = () => {
      try {
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem("kairos-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
      } finally {
        setLoading(false)
      }
    }

    // Add a small delay to simulate loading
    setTimeout(loadUser, 500)
  }, [])

  const signIn = async (provider: "google" | "github") => {
    setLoading(true)
    try {
      // Simulate OAuth authentication
      // In a real app, this would redirect to the OAuth provider

      // For demo purposes, create a mock user
      const mockUsers = {
        google: {
          id: "google-123",
          name: "Alex Johnson",
          email: "alex@example.com",
          image: "/placeholder.svg?height=40&width=40",
          role: "user" as const,
        },
        github: {
          id: "github-456",
          name: "Sam Developer",
          email: "sam@example.com",
          image: "/placeholder.svg?height=40&width=40",
          role: "admin" as const,
        },
      }

      const newUser = mockUsers[provider]
      setUser(newUser)
      localStorage.setItem("kairos-user", JSON.stringify(newUser))

      toast({
        title: "Signed in successfully",
        description: `Welcome, ${newUser.name}!`,
      })

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "There was a problem signing you in.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      // Clear user data
      setUser(null)
      localStorage.removeItem("kairos-user")

      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      })

      // Redirect to home page after logout
      router.push("/")
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

