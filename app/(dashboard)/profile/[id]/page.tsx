import { UserProfile } from "@/components/profile/user-profile"
import { ReviewsList } from "@/components/reviews/reviews-list"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 md:p-10">
      <UserProfile userId={params.id} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <ReviewsList userId={params.id} />
      </div>
    </div>
  )
} 