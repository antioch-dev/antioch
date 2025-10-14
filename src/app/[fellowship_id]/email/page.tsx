"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition"
import { Mail, Users, Shield, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  const fellowships = [
    { id: "fellowship-1", name: "Grace Community Fellowship", members: 150 },
    { id: "fellowship-2", name: "Hope Baptist Fellowship", members: 89 },
    { id: "fellowship-3", name: "Faith Community Church", members: 203 },
  ]

  const features = [
    "Multi-role email management system",
    "Fellowship-specific email accounts",
    "Platform admin oversight",
    "Secure mail server integration",
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-5xl font-bold text-foreground">Antioch Platform</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive multi-fellowship hosting system with integrated email management, designed specifically for
              church communities and their communication needs.
            </p>

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fellowship Cards */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Select Your Fellowship</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fellowships.map((fellowship, index) => (
                <Card
                  key={fellowship.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Users className="h-5 w-5 text-primary" />
                      {fellowship.name}
                    </CardTitle>
                    <CardDescription>{fellowship.members} members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Link href={`/${fellowship.id}/emails/notifications`}>
                        <Button className="w-full group-hover:bg-primary/90 transition-colors flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Access Email System
                          <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link href={`/${fellowship.id}`}>
                        <Button className="w-full bg-transparent" variant="outline">
                          Fellowship Home
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Admin Section */}
          <div className="max-w-md mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Shield className="h-5 w-5 text-primary" />
                  Platform Administration
                </CardTitle>
                <CardDescription>Global email management and oversight across all fellowships</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/emails/dashboard">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-medium">mail.antioch.com</span> • Secure email hosting for church
              communities
            </p>
          </div>
        </div>
      </PageTransition>
    </div>
  )
}
