// Type definitions for the application

export interface MoodEntry {
  id: string
  mood: string
  comment: string
  timestamp: string
}

export interface MoodOption {
  value: string
  label: string
  emoji: string
}
