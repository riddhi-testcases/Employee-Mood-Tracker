# Mini Employee Mood Tracker

A full-stack web application built with Next.js that allows employees to submit their current mood and administrators to view all mood entries.

## Features

- Home page with welcome message and button to submit mood
- Mood submission page with emoji selection and optional comment field
- Admin dashboard to view all mood submissions
- Light/dark mode toggle
- Responsive design for all screen sizes
- In-memory data storage (no database required)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Shadcn/UI components
- Next.js API Routes

## Project Structure

```
/app
  /page.tsx            # Home page
  /mood/page.tsx       # Mood submission page
  /admin/page.tsx      # Admin dashboard
  /api/mood/route.ts   # API route for mood entries
/components
  /mood-table.tsx      # Table component for admin dashboard
  /navbar.tsx          # Navigation component
  /mode-toggle.tsx     # Theme toggle component
  /footer.tsx          # Footer component
/lib
  /moods.ts            # In-memory storage for mood entries
  /types.ts            # TypeScript interfaces
  /utils.ts            # Utility functions
```

## Set Up

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application can be easily deployed to Vercel:

1. Push code to GitHub repository
2. Import the repository in Vercel
3. Deploy with default settings

## Usage

1. Navigate to the home page and click "Submit Your Mood"
2. Select your mood (Happy, Neutral, or Sad) and add an optional comment
3. Submit your mood
4. View all mood submissions on the Admin page
( If mood is not visible in admin at first try, submit another; it will be visible and stored from then onwards )

## Future Improvements

- Add authentication for admin access
- Implement persistent storage with a database
- Add data visualization for mood trends
- Add user profiles and user-specific mood history
- Implement notifications for mood trends

## Author

Designed & Developed by Riddhi Chakraborty
