"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { signInWithProvider, signOut, getCurrentUser } from '@/services/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (provider: 'google' | 'github') => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)
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
      localStorage.setItem('token', token)
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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

