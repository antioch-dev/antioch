"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FellowshipNav } from "@/components/fellowship-nav"
import { getSentEmailsByFellowship, type SentEmail } from "@/lib/mock-data"
import { Send, Mail, ExternalLink, History, Paperclip } from "lucide-react"
import { useRouter } from "next/navigation"

interface SendEmailPageProps {
  params: { fellowship_id: string }
}

export default function SendEmailPage({ params }: SendEmailPageProps) {
  const fellowshipId = params.fellowship_id
  const router = useRouter()
  const [sentEmails] = useState<SentEmail[]>(getSentEmailsByFellowship(fellowshipId))

  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    subject: "",
    message: "",
  })

  const [isSending, setIsSending] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSend = async () => {
    setIsSending(true)

    // Mock sending delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

  
    const mailtoUrl = `https://mail.antioch.com/compose?to=${encodeURIComponent(formData.to)}&cc=${encodeURIComponent(formData.cc)}&subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`

    // Open in new tab
    window.open(mailtoUrl, "_blank")

    setIsSending(false)

    // Reset form
    setFormData({
      to: "",
      cc: "",
      subject: "",
      message: "",
    })
  }

  const isFormValid = formData.to && formData.subject && formData.message

  return (
    <div className="min-h-screen bg-background">
      <FellowshipNav fellowshipId={fellowshipId} userRole="admin" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Send Official Email</h1>
          <p className="text-muted-foreground">Compose and send emails from your fellowship&apos;s official account</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Email Composition Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Compose Email
                </CardTitle>
                <CardDescription>Send from: fellowship-{fellowshipId}@mail.antioch.com</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="to">To *</Label>
                  <Input
                    id="to"
                    type="email"
                    placeholder="recipient@example.com"
                    value={formData.to}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="cc">CC</Label>
                  <Input
                    id="cc"
                    type="email"
                    placeholder="cc@example.com"
                    value={formData.cc}
                    onChange={(e) => handleInputChange("cc", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Email subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={12}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                  <span>Attachments will be available in the full email client</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSend} disabled={!isFormValid || isSending} className="flex items-center gap-2">
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Email
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open("https://mail.antioch.com", "_blank")}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Full Client
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sent Emails */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Sent
                </CardTitle>
                <CardDescription>Last 5 sent emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentEmails.slice(0, 5).map((email) => (
                    <div key={email.id} className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium truncate" title={email.subject}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate" title={email.to}>
                        To: {email.to}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{email.sentAt.toLocaleDateString()}</p>
                    </div>
                  ))}
                  {sentEmails.length === 0 && (
                    <p className="text-center text-muted-foreground py-4 text-sm">No emails sent yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      to: "community@mail.antioch.com",
                      subject: "Fellowship Update",
                    }))
                  }
                >
                  Community Update
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      to: "volunteers@mail.antioch.com",
                      subject: "Volunteer Coordination",
                    }))
                  }
                >
                  Volunteer Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      to: "leadership@mail.antioch.com",
                      subject: "Leadership Update",
                    }))
                  }
                >
                  Leadership Update
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
