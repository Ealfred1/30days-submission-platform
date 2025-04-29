import { Suspense } from 'react'
import { UserProfile } from "@/components/profile/user-profile"
import { ReviewsList } from "@/components/reviews/reviews-list"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
  // Await the params before using them
  const { id } = await params

  return (
    <div className="p-6 md:p-10">
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile userId={id} />
      </Suspense>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewsList userId={id} />
        </Suspense>
      </div>
    </div>
  )
} 