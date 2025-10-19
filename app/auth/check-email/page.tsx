import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-amber-700" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Please check your email and click the confirmation link to complete your signup.
            </p>
            <p className="text-sm text-muted-foreground">If you don't see the email, check your spam folder.</p>
            <Link href="/">
              <Button className="w-full bg-amber-700 hover:bg-amber-800">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
