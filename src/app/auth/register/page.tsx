"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Correct hook for App Router navigation

// Assuming these are your Shadcn UI components or similar
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Assuming these are your Lucide React icons
import { ChevronLeft, User, Mail, Lock, Github, Cross, MapPin, Globe, Users } from "lucide-react"

// Assuming this is your custom background component
import { BackgroundGallery } from "@/components/background-gallery"

export default function RegisterPage() {
  // State variables for form fields and UI feedback
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [fellowship, setFellowship] = useState("")
  const [error, setError] = useState<string | null>(null) // State for displaying form errors

  const router = useRouter() // Initialize Next.js router for navigation

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission behavior
    setIsLoading(true) // Set loading state to true
    setError(null) // Clear any previous errors

    // Client-side validation for password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return // Stop the submission
    }
    // Client-side validation for all required fields
    if (!firstName || !lastName || !email || !country || !city || !fellowship || !password) {
        setError("Please fill in all required fields.")
        setIsLoading(false)
        return
    }

    // Simulate an API call for registration
    // In a real application, you would make a fetch or axios call to your backend here:
    // try {
    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ firstName, lastName, email, password, country, city, fellowship }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     // Assuming your backend returns a user ID (e.g., data.userId) upon successful registration
    //     // const userId = data.userId; // No longer needed if redirecting to login
    //     router.push(`/auth/login`); // Redirect to the login page
    //   } else {
    //     setError(data.message || 'Registration failed. Please try again.');
    //   }
    // } catch (err) {
    //   setError('An unexpected error occurred. Please try again later.');
    // } finally {
    //   setIsLoading(false);
    // }

    // Using a setTimeout to simulate network delay for demonstration purposes
    setTimeout(() => {
      setIsLoading(false)
      // We will use a simulated user ID for demonstration.
      // In a real app, this 'user123' would come from your backend after successful registration.
      // const simulatedUserId = "user123" // No longer needed if redirecting to login

      // --- THIS IS THE CORRECTED REDIRECT PATH ---
      // Redirect to the login page
      router.push("/auth/login")
    }, 1500)
  }

  // Data for country, city, and fellowship selections
  const countries = ["China", "United States", "United Kingdom", "Canada", "Australia", "Other"]

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
        return ["Please select a country first"] // Default option
    }
  }

  const getFellowshipsByCity = (selectedCity: string) => {
    switch (selectedCity) {
      case "Wuhan":
        return ["WuhanICF"]
      case "Chengdu":
        return ["ChengduICF"]
      case "New York":
        return ["NYC Fellowship"]
      case "London":
        return ["London Grace Church"]
      case "Toronto":
        return ["Toronto Christian Fellowship"]
      case "Sydney":
        return ["Sydney Life Church"]
      default:
        return ["Other Fellowship"] // Default option
    }
  }

  // Images for the background gallery
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
      {/* Background gallery component */}
      <BackgroundGallery images={galleryImages} />

      {/* Back to home link */}
      <div className="container py-8 z-10">
        <Link href="/" className="inline-flex items-center text-white hover:text-gray-200">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>

      {/* Main registration card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        <Card className="w-full max-w-md border-gray-200 shadow-lg bg-white/95">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Cross className="h-10 w-10 text-black" /> {/* Example icon */}
            </div>
            <CardTitle className="text-2xl font-bold text-black">Join A fellowship</CardTitle>
            <CardDescription>Become part of the Antioch community</CardDescription>
            <div className="pt-2">
              <p className="text-xs text-gray-500 italic">
                &quot;For where two or three gather in my name, there am I with them.&quot;
                <span className="block mt-1">— Matthew 18:20</span>
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name */}
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Country Select */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select
                    onValueChange={(value) => {
                      setCountry(value)
                      setCity("") // Reset city when country changes
                      setFellowship("") // Reset fellowship when country changes
                    }}
                    value={country}
                  >
                    <SelectTrigger id="country" className="pl-10 border-gray-200 focus:ring-black">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((countryOption) => (
                        <SelectItem key={countryOption} value={countryOption}>
                          {countryOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* City Select */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select
                    onValueChange={(value) => {
                      setCity(value)
                      setFellowship("") // Reset fellowship when city changes
                    }}
                    value={city}
                    disabled={!country} // Disable until a country is selected
                  >
                    <SelectTrigger id="city" className="pl-10 border-gray-200 focus:ring-black">
                      <SelectValue placeholder={country ? "Select your city" : "Select a country first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getCitiesByCountry(country).map((cityOption) => (
                        <SelectItem key={cityOption} value={cityOption}>
                          {cityOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fellowship Select */}
              <div className="space-y-2">
                <Label htmlFor="fellowship">Fellowship</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Select onValueChange={setFellowship} value={fellowship} disabled={!city}> {/* Disable until a city is selected */}
                    <SelectTrigger id="fellowship" className="pl-10 border-gray-200 focus:ring-black">
                      <SelectValue placeholder={city ? "Select your fellowship" : "Select a city first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getFellowshipsByCity(city).map((fellowshipOption) => (
                        <SelectItem key={fellowshipOption} value={fellowshipOption}>
                          {fellowshipOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    className="pl-10 border-gray-200 focus-visible:ring-black"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
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

              {/* Error Message Display */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Join Fellowship"}
              </Button>
            </form>

            {/* "Or continue with" divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social login buttons (example) */}
            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="border-gray-200">
                <Github className="mr-2 h-4 w-4" /> {/* Example social icon */}
                Google
              </Button>
            </div>
          </CardContent>

          {/* Already have an account link */}
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