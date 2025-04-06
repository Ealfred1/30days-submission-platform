import { ReviewsList } from "@/components/reviews/reviews-list"
import { ReviewFilters } from "@/components/reviews/review-filters"

export default function ReviewsPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Reviews</h1>
      <ReviewFilters />
      <div className="mt-6">
        <ReviewsList />
      </div>
    </div>
  )
}

