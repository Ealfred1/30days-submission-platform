import { Suspense } from 'react'
import { UserProfile } from "@/components/profile/user-profile"
import { ReviewsList } from "@/components/reviews/reviews-list"

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 md:p-10">
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={params.id} />
      </Suspense>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewsList userId={params.id} />
        </Suspense>
      </div>
    </div>
  )
} 