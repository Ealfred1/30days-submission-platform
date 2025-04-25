"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { signInWithProvider, signOut, getCurrentUser, getCurrentUserInfo, UserInfo } from '@/services/auth'
import { toast } from '@/components/ui/use-toast'

interface AuthContextType {
  user: User | null;
  userInfo: UserInfo | null;
  loading: boolean;
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userInfo: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserInfo = async () => {
    // Only fetch if we have a token
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const info = await getCurrentUserInfo()
      setUserInfo(info)
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      // If we get an unauthorized error, clear the tokens
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
      }
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)
        
        // If user exists, get a fresh ID token and verify with backend
        if (user) {
          const idToken = await user.getIdToken(true) // Force refresh the token
          const response = await signInWithProvider(user.providerData[0]?.providerId as 'google' | 'github')
          if (response?.token) {
            await fetchUserInfo()
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      const { user, token } = await signInWithProvider(provider)
      setUser(user)
      // Token is already stored in localStorage by signInWithProvider
      await fetchUserInfo()
    } catch (error) {
      console.error('Sign in error:', error)
      toast({
        title: "Authentication Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      setUserInfo(null)
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

