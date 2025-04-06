import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileSubmissions } from "@/components/profile/profile-submissions"
import { ProfileAchievements } from "@/components/profile/profile-achievements"

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-10">
      <ProfileHeader />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <ProfileStats />
          <div className="mt-6">
            <ProfileAchievements />
          </div>
        </div>
        <div className="lg:col-span-2">
          <ProfileSubmissions />
        </div>
      </div>
    </div>
  )
}

