import type { Metadata } from "next"
import { MoodTable } from "@/components/mood-table"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Admin Dashboard | Employee Mood Tracker",
  description: "View and analyze employee mood submissions",
}

export default function AdminPage() {
  return (
    <div className="container py-10 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
          <CardDescription>View and analyze all employee mood submissions</CardDescription>
        </CardHeader>
      </Card>
      <MoodTable />
    </div>
  )
}
