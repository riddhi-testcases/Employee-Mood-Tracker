"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { MoodEntry } from "@/lib/types"

export function MoodTable() {
  // State for mood entries, loading state, and errors
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch mood entries on component mount
  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const response = await fetch("/api/mood")

        if (!response.ok) {
          throw new Error("Failed to fetch mood entries")
        }

        const data = await response.json()
        setMoodEntries(data)
      } catch (err) {
        setError("Failed to load mood entries")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMoodEntries()
  }, [])

  // Helper function to get emoji for mood
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy":
        return "😄"
      case "neutral":
        return "😐"
      case "sad":
        return "😞"
      default:
        return ""
    }
  }

  // Helper function to get badge for mood
  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case "happy":
        return <Badge className="bg-green-500 hover:bg-green-600">Happy</Badge>
      case "neutral":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Neutral</Badge>
      case "sad":
        return <Badge className="bg-red-500 hover:bg-red-600">Sad</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Format date for display
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading mood entries...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Submissions</CardTitle>
        <CardDescription>View all employee mood submissions</CardDescription>
      </CardHeader>
      <CardContent>
        {moodEntries.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">No mood entries yet</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mood</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="max-w-[300px]">Comment</TableHead>
                    <TableHead className="w-[180px]">Submitted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moodEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                      </TableCell>
                      <TableCell>{getMoodBadge(entry.mood)}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{entry.comment || "No comment provided"}</TableCell>
                      <TableCell>{formatDate(entry.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
