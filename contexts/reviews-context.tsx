"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { Review, reviewsApi, CreateReviewData } from "@/services/reviews-api"

interface ReviewsContextType {
  reviews: Review[]
  fetchReviews: (userId?: string) => Promise<void>
  searchTerm: string
  projectFilter: string
  ratingFilter: string
  setSearchTerm: (term: string) => void
  setProjectFilter: (project: string) => void
  setRatingFilter: (rating: string) => void
  incrementHelpful: (reviewId: number) => void
  addReview: (review: CreateReviewData) => Promise<void>
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: Review[]
}

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<PaginatedResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async (userId?: string) => {
    try {
      console.log("Fetching reviews for userId:", userId)
      let response: PaginatedResponse
      
      if (userId) {
        response = await reviewsApi.getByUser(userId)
      } else {
        response = await reviewsApi.getAll()
      }

      console.log("Fetched reviews:", response)
      setReviews(response)
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
      setReviews(null)
    }
  }

  const incrementHelpful = async (reviewId: number) => {
    try {
      const updatedReview = await reviewsApi.incrementHelpful(reviewId)
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: updatedReview.helpful }
          : review
      ))
    } catch (error) {
      console.error("Failed to increment helpful count:", error)
    }
  }

  const addReview = async (reviewData: CreateReviewData) => {
    try {
      const newReview = await reviewsApi.create(reviewData)
      setReviews(prevReviews => [newReview, ...prevReviews])
      return newReview
    } catch (error) {
      console.error("Failed to add review:", error)
      throw error
    }
  }

  return (
    <ReviewsContext.Provider value={{
      reviews,
      fetchReviews,
      searchTerm,
      projectFilter,
      ratingFilter,
      setSearchTerm,
      setProjectFilter,
      setRatingFilter,
      incrementHelpful,
      addReview,
    }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviews = () => {
  const context = useContext(ReviewsContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewsProvider")
  }
  return context
} 