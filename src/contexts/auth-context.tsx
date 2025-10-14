"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

const useRouter = () => ({ push: (path: string) => console.log(`Navigating to: ${path}`) });

// Mock User type (based on what the context and usage needs)
interface User {
  id: string;
  email: string;
  role: "admin" | "author";
}


const getCurrentUser = async (): Promise<User | null> => {
    return null; 
};


const authSignIn = async (email: string, password: string): Promise<{ user: User } | null> => {
    console.log(`Mock sign in attempt for: ${email}`);
    if (email === "admin@fellowship.org" && password === "secret") {
        return { user: { id: "mock-admin-456", email, role: "admin" } };
    }
    if (email === "author@fellowship.org" && password === "secret") {
        return { user: { id: "mock-user-123", email, role: "author" } };
    }
    return null;
};

const authSignOut = (): void => {
    console.log("User signed out.");
};


interface AuthContextType {
  user: User | null
  loading: boolean
  
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // FIX 1: Use an async function and await getCurrentUser() to resolve error 2345 (promise not assignable)
    const initAuth = async () => {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setLoading(false)
    }
    // FIX 1: Use 'void' operator to explicitly indicate the promise is not handled (resolves no-floating-promises)
    void initAuth() 
  }, [])

  
  const signIn = async (email: string, password: string): Promise<boolean> => {
    const response = await authSignIn(email, password)
    
    // FIX 2: Use optional chaining for conciseness (resolves prefer-optional-chain)
    if (response?.user) {
      setUser(response.user)
      return true
    }
    return false
  }

  const signOut = () => {
    authSignOut()
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
