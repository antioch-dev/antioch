import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface RegistrationSuccessPageProps {
  params: { fellowship_id: string }
}

export default function RegistrationSuccessPage({ params }: RegistrationSuccessPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Success Message */}
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Your leadership profile has been successfully created. You can now accept leadership appointments and
              participate in the fellowship leadership team.
            </p>
            <Link href={`/${params.fellowship_id}/leadership/public`}>
              <Button size="lg">
                View Leadership Directory
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
            <CardDescription>What you can do now</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <div className="font-medium text-foreground">Check for appointment invitations</div>
                  <div className="text-muted-foreground">
                    Look for invitation emails or links from fellowship admins
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <div className="font-medium text-foreground">Contact fellowship leadership</div>
                  <div className="text-muted-foreground">Reach out if you have questions about your role</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <div>
                  <div className="font-medium text-foreground">View the leadership directory</div>
                  <div className="text-muted-foreground">See current leadership and your profile when appointed</div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Welcome to the Fellowship {params.fellowship_id} Leadership Team!</p>
        </div>
      </div>
    </div>
  )
}
