"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

const useRouter = () => ({ push: (path: string) => console.log(`Navigating to: ${path}`) });

// Mock User type (based on what the context and usage needs)
export interface User {
  id: string;
  email: string;
  name: string ;
  role: "admin" | "author";
}


const getCurrentUser = async (): Promise<User | null> => {
    return null; 
};


const authSignIn = async (email: string, password: string): Promise<{ user: User } | null> => {
    console.log(`Mock sign in attempt for: ${email}`);
    if (email === "admin@fellowship.org" && password === "secret") {
    return { 
        user: {  id: "mock-admin-456", email, role: "admin",name: "Admin User"  
        } 
    };
}
    if (email === "author@fellowship.org" && password === "secret") {
        return { user: { id: "mock-user-123", email, role: "author",name:"fellowship Author" } };
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
    const initAuth = async () => {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setLoading(false)
    }
    void initAuth() 
  }, [])

  
  const signIn = async (email: string, password: string): Promise<boolean> => {
    const response = await authSignIn(email, password)
    
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

