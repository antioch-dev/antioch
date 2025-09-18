"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockTopics } from "@/lib/mock-data"
import { MessageSquare, MessageCircle, Users, Search, CheckCircle } from "lucide-react"

export default function PublicQAInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const publicTopics = mockTopics.filter((topic) => topic.status === "open")

 useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import("aos")).default
      await import("aos/dist/aos.css") 

      AOS.init({
        duration: 600,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
      })
    }
    void initAOS()
  }, [])

  const filteredTopics = publicTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAnswerSettingText = (setting: string) => {
    switch (setting) {
      case "allow_all":
        return "Everyone can answer"
      case "require_review":
        return "Answers reviewed"
      case "not_allowed":
        return "Church answers only"
      default:
        return setting
    }
  }

  const getAnswerSettingColor = (setting: string) => {
    switch (setting) {
      case "allow_all":
        return "bg-green-100 text-green-800"
      case "require_review":
        return "bg-yellow-100 text-yellow-800"
      case "not_allowed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Fellowship Q&A
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="200">
            Ask questions, share insights, and engage with our community discussions
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative" data-aos="fade-up" data-aos-delay="400">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/80 backdrop-blur-sm border-2 focus:border-primary/50 transition-all duration-300 hover:shadow-lg"
            />
          </div>
        </div>

        {/* Active Topics */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2" data-aos="slide-right">
            <MessageSquare className="w-6 h-6 text-primary" />
            Active Discussions
          </h2>

          {filteredTopics.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic, index) => (
                <div key={topic.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 hover:border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Link href={`QAsystem/fellowship-name/qa/public/topic/${topic.id}`}>
                      <CardHeader className="pb-3 relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                            {topic.title}
                          </CardTitle>
                          <Badge className="bg-green-100 text-green-800 shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Open
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
                          {topic.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 relative z-10">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex gap-4 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {topic.questionsCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {topic.answersCount}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getAnswerSettingColor(topic.answerSetting)} group-hover:scale-105 transition-transform duration-300`}
                        >
                          {getAnswerSettingText(topic.answerSetting)}
                        </Badge>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12" data-aos="fade-up">
              <CardContent>
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchTerm ? "No topics found" : "No active topics"}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "Check back later for new discussion topics"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* How it Works */}
        <Card className="bg-card/80 backdrop-blur-sm border-2 border-border/50" data-aos="fade-up" data-aos-delay="600">
          <CardHeader>
            <CardTitle className="text-center text-xl">How to Participate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="group" data-aos="slide-up" data-aos-delay="700">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  Ask Questions
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Submit your questions about the topic or message
                </p>
              </div>
              <div className="group" data-aos="slide-up" data-aos-delay="800">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  Share Insights
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Contribute answers and insights to help others
                </p>
              </div>
              <div className="group" data-aos="slide-up" data-aos-delay="900">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                  Engage Together
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  Learn and grow together as a community
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
