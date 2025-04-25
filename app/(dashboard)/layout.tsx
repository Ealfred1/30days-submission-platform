import type React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { SubmissionProvider } from "@/providers/submission-provider"
import { DashboardProvider } from "@/providers/dashboard-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardProvider>
      <SubmissionProvider>
        <DashboardShell>{children}</DashboardShell>
      </SubmissionProvider>
    </DashboardProvider>
  )
}
