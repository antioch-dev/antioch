"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/fellowshipblog/header"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/fellowshipid/fellowship-blog/admin")
    }
  }, [isAuthenticated, router])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </>
  )
}
