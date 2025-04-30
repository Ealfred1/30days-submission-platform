"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { signInWithProvider, signOut, getCurrentUser, getCurrentUserInfo, UserInfo } from '@/services/auth'
import { toast } from '@/components/ui/use-toast'

interface UserInfo {
  id: number
  email: string
  name: string
  avatar: string
  firebase_uid: string
  provider: string
  is_staff: boolean
  is_superuser: boolean
  date_joined: string
  last_login: string | null
}

interface AuthContextType {
  user: User | null
  userInfo: UserInfo | null
  loading: boolean
  isAdmin: boolean
  signIn: (provider: 'google' | 'github') => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userInfo: null,
  loading: true,
  isAdmin: false,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchUserInfo = async () => {
    // Only fetch if we have a token
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const info = await getCurrentUserInfo()
      setUserInfo(info)
      // Set admin status based on user info
      setIsAdmin(info.is_staff || info.is_superuser)
      console.log('User info:', info) // Debug log
      console.log('Is admin:', info.is_staff || info.is_superuser) // Debug log
    } catch (error) {
      console.error('Failed to fetch user info:', error)
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
        
        if (user) {
          const idToken = await user.getIdToken(true)
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

  // Add debug log
  useEffect(() => {
    console.log('Current auth state:', {
      user: !!user,
      userInfo,
      isAdmin,
      loading
    })
  }, [user, userInfo, isAdmin, loading])

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
        isAdmin,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

