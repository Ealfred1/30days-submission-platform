import type React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { SubmissionProvider } from "@/providers/submission-provider"
import { DashboardProvider } from "@/providers/dashboard-provider"
import { ReviewsProvider } from "@/contexts/reviews-context"
import { AdminProvider } from "@/providers/admin-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardProvider>
      <AdminProvider>
        <SubmissionProvider>
          <ReviewsProvider>
            <DashboardShell>{children}</DashboardShell>
          </ReviewsProvider>
        </SubmissionProvider>
      </AdminProvider>
    </DashboardProvider>
  )
}
