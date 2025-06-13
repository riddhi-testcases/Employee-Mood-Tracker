"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import type { MoodOption } from "@/lib/types"

// Define mood options with emojis
const moodOptions: MoodOption[] = [
  { value: "happy", label: "Happy", emoji: "😄" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "sad", label: "Sad", emoji: "😞" },
]

export default function MoodPage() {
  // State management
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!selectedMood) {
      toast({
        title: "Error",
        description: "Please select a mood",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Submit data to API
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selectedMood,
          comment,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit mood")
      }

      // Show success message
      toast({
        title: "Success",
        description: "Your mood has been submitted successfully!",
      })

      // Redirect after a short delay to show the toast
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error) {
      // Handle errors
      toast({
        title: "Error",
        description: "Failed to submit your mood. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-md py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How are you feeling today?</CardTitle>
          <CardDescription>Select your current mood and add an optional comment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-4">
            {moodOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedMood === option.value ? "default" : "outline"}
                className="flex flex-col h-auto py-4 px-6 transition-all"
                onClick={() => setSelectedMood(option.value)}
              >
                <span className="text-3xl mb-2">{option.emoji}</span>
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Additional comments (optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Share more about how you're feeling..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Mood"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
