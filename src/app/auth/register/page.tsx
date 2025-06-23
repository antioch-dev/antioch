"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// FIX 1: Removed 'Facebook' as it was unused.
import { ChevronLeft, User, Mail, Lock, Github, Cross, MapPin, Globe, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackgroundGallery } from "@/components/background-gallery"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // List of countries (simplified for this example)
  const countries = ["China", "United States", "United Kingdom", "Canada", "Australia", "Other"]

  // Cities based on country selection
  const getCitiesByCountry = (selectedCountry: string) => {
    switch (selectedCountry) {
      case "China":
        return ["Wuhan", "Chengdu", "Beijing", "Shanghai", "Guangzhou", "Other"]
      case "United States":
        return ["New York", "Los Angeles", "Chicago", "Houston", "Other"]
      case "United Kingdom":
        return ["London", "Manchester", "Birmingham", "Other"]
      case "Canada":
        return ["Toronto", "Vancouver", "Montreal", "Other"]
      case "Australia":
        return ["Sydney", "Melbourne", "Brisbane", "Other"]
      default:
        return ["Please select a country first"]
    }
  }

  // Fellowships based on city selection
  const getFellowshipsByCity = (selectedCity: string) => {
    switch (selectedCity) {
      case "Wuhan":
        return ["WuhanICF"]
      case "Chengdu":
        return ["ChengduICF"]
      default:
        return ["Other Fellowship"]
    }
  }

  const galleryImages = [
    "https://maravianwebservices.com/images/wicf/20241231_crossover/thumbnails/tn_Cross%20over004.jpg",
    "https://maravianwebservices.com/images/wicf/20250222_relationship_conference/thumbnails/tn_IMG_0090.jpg",
    "https://maravianwebservices.com/images/wicf/20241130_worship_experience_1/thumbnails/tn_IMG_2925.JPG",
    "https://files.maravianwebservices.com/wicf/20250405_sof_championship_1/thumbnails/tn_IMG_8116.jpg",
    "https://maravianwebservices.com/images/wicf/20241130_worship_experience_2/thumbnails/tn_WICF-35.jpg",
    "https://maravianwebservices.com/images/wicf/20241130_worship_experience_2/thumbnails/tn_IMG_2941.JPG",
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundGallery images={galleryImages} />

      <div className="container py-8 z-10">
        <Link href="/" className="inline-flex items-center text-white hover:text-gray-200">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        <Card className="w-full max-w-md border-gray-200 shadow-lg bg-white/95">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Cross className="h-10 w-10 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">Join A fellowship</CardTitle>
            <CardDescription>Become part of the Antioch community</CardDescription>
            <div className="pt-2">
              <p className="text-xs text-gray-500 italic">
                {/* FIX 2: Escaped double quotes with &quot; */}
                &quot;For where two or three gather in my name, there am I with them.&quot;
                <span className="block mt-1">— Matthew 18:20</span>
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="first-name"
                      placeholder="John"
                      className="pl-10 border-gray-200 focus-visible:ring-black"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      className="pl-10 border-gray-200 focus-visible:ring-black"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>

              {/* Country Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select onValueChange={setCountry} value={country}>
                    <SelectTrigger id="country" className="pl-10 border-gray-200 focus:ring-black">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* City Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select onValueChange={setCity} value={city} disabled={!country}>
                    <SelectTrigger id="city" className="pl-10 border-gray-200 focus:ring-black">
                      <SelectValue placeholder={country ? "Select your city" : "Select a country first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getCitiesByCountry(country).map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fellowship Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="fellowship">Fellowship</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select disabled={!city}>
                    <SelectTrigger id="fellowship" className="pl-10 border-gray-200 focus:ring-black">
                      <SelectValue placeholder={city ? "Select your fellowship" : "Select a city first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getFellowshipsByCity(city).map((fellowship) => (
                        <SelectItem key={fellowship} value={fellowship}>
                          {fellowship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="#" className="text-black hover:text-gray-600">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-black hover:text-gray-600">
                    privacy policy
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Join Fellowship"}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="border-gray-200">
                <Github className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already part of our fellowship?{" "}
              <Link href="/auth/login" className="text-black hover:text-gray-600 font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}