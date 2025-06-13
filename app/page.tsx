import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">Employee Mood Tracker</CardTitle>
          <CardDescription className="text-lg">Help us understand how you're feeling today</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-center mb-8 text-muted-foreground">
            Your feedback is important to us and helps create a better workplace environment.
          </p>
          <Link href="/mood">
            <Button size="lg" className="px-8">
              Submit Your Mood
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
