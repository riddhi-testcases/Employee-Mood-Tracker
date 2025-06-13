export function Footer() {
  // Simple footer component with attribution
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Employee Mood Tracker. Designed & Developed by Riddhi Chakraborty.
        </p>
        <p className="text-sm text-muted-foreground">All rights reserved.</p>
      </div>
    </footer>
  )
}
