"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User } from "@/lib/data"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          return false
        }

        const data = await response.json()
        setUser(data.user)

        return true
      } catch (error) {
        console.error("Login error:", error)
        return false
      }
    },
    []
  )

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.log("Signup error:", errorData)
          return false
        }

        const data = await response.json()

        // If backend returns user object
        if (data.user) {
          setUser(data.user)
        }

        return true
      } catch (error) {
        console.error("Signup failed:", error)
        return false
      }
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
