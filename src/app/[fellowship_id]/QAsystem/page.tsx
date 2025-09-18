"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Presentation, Settings } from "lucide-react"

export default function HomePage() {
 useEffect(() => {
  const initAOS = async () => {
    const AOS = (await import("aos")).default;
    await import("aos/dist/aos.css"); // ✅ dynamic import works without typings
    AOS.init({ duration: 600, easing: "ease-out-cubic", once: true, offset: 50 });
  };
  void initAOS();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            Antioch Q&A System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Interactive question and answer system for church services, Bible studies, and fellowship gatherings
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div data-aos="zoom-in" data-aos-delay="100">
            <Link href="/fellowship-name/qa">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Settings className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    Admin Dashboard
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    Manage topics, questions, and answers
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div data-aos="zoom-in" data-aos-delay="200">
            <Link href="/fellowship-name/qa/public">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-accent/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Users className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors duration-300">
                    Public Interface
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    Submit questions and view answers
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div data-aos="zoom-in" data-aos-delay="300">
            <Link href="/fellowship-name/qa/projection/1">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-secondary/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                    <Presentation className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-secondary transition-colors duration-300">
                    Live Projection
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    Display questions during service
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div data-aos="zoom-in" data-aos-delay="400">
            <Link href="/fellowship-name/qa/control/1">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border-2 hover:border-chart-1/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-chart-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-chart-1/10 rounded-full flex items-center justify-center group-hover:bg-chart-1/20 transition-colors duration-300">
                    <MessageSquare className="w-8 h-8 text-chart-1 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-chart-1 transition-colors duration-300">
                    Control Panel
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    Manage live projection display
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        {/* Features Overview */}
        <div
          className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h2
            className="text-2xl font-bold text-card-foreground mb-6 text-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            System Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group" data-aos="slide-up" data-aos-delay="700">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                Topic Management
              </h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Create and manage Q&A topics with flexible answer settings
              </p>
            </div>
            <div className="text-center group" data-aos="slide-up" data-aos-delay="800">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                Live Interaction
              </h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Real-time question submission and answer management
              </p>
            </div>
            <div className="text-center group" data-aos="slide-up" data-aos-delay="900">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <Presentation className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                Projection Ready
              </h3>
              <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                Optimized display for church projection systems
              </p>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
        </div>
      </div>
    </div>
  )
}
