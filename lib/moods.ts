import type { MoodEntry } from "./types"

// In-memory storage for mood entries
let moodEntries: MoodEntry[] = []

// Get all mood entries sorted by timestamp (newest first)
export function getMoodEntries(): MoodEntry[] {
  return [...moodEntries].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Add a new mood entry
export function addMoodEntry(entry: MoodEntry): void {
  moodEntries.push(entry)
}

// For development/testing purposes - add some sample data
if (process.env.NODE_ENV === "development") {
  // Add some sample data if none exists
  if (moodEntries.length === 0) {
    const sampleEntries: MoodEntry[] = [
      {
        id: "1",
        mood: "happy",
        comment:
          "Great team meeting today! I'm excited about our new project direction and the collaborative atmosphere.",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: "2",
        mood: "neutral",
        comment: "Regular day at work. Nothing particularly exciting or disappointing happened.",
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      },
      {
        id: "3",
        mood: "sad",
        comment: "Missed project deadline due to unexpected technical issues. Feeling a bit overwhelmed.",
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      },
      {
        id: "4",
        mood: "happy",
        comment: "Just completed a challenging task that I've been working on for weeks!",
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
      {
        id: "5",
        mood: "neutral",
        comment: "",
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      },
    ]

    moodEntries = sampleEntries
  }
}
