import type React from "react"
// This layout is for the marketing pages (landing page)
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}

