import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { ChallengeTimeline } from "@/components/dashboard/challenge-timeline"

export default function Dashboard() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      <DashboardHero />
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <ChallengeTimeline />
        </div>
      </div>
    </div>
  )
}

