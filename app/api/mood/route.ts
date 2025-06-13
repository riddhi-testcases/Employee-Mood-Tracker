import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { addMoodEntry, getMoodEntries } from "@/lib/moods"
import type { MoodEntry } from "@/lib/types"

// GET handler for retrieving all mood entries
export async function GET() {
  try {
    const entries = getMoodEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error("Error fetching mood entries:", error)
    return NextResponse.json({ error: "Failed to fetch mood entries" }, { status: 500 })
  }
}

// POST handler for creating a new mood entry
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    if (!body.mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 })
    }

    // Validate mood value
    const validMoods = ["happy", "neutral", "sad"]
    if (!validMoods.includes(body.mood)) {
      return NextResponse.json({ error: "Invalid mood value" }, { status: 400 })
    }

    // Create new mood entry
    const newEntry: MoodEntry = {
      id: uuidv4(),
      mood: body.mood,
      comment: body.comment || "",
      timestamp: new Date().toISOString(),
    }

    // Add entry to storage
    addMoodEntry(newEntry)

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error("Error creating mood entry:", error)
    return NextResponse.json({ error: "Failed to create mood entry" }, { status: 500 })
  }
}
