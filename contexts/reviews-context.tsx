"use client"
import { createContext, useContext, useState } from "react"
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

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const fetchReviews = async (userId?: string) => {
    try {
      let response
      if (userId) {
        response = await reviewsApi.getByUser(userId)
      } else {
        response = await reviewsApi.getAll()
      }
      // Ensure we're setting an array
      setReviews(Array.isArray(response) ? response : [])
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
      setReviews([]) // Set empty array on error
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
      setReviews([newReview, ...reviews])
    } catch (error) {
      console.error("Failed to add review:", error)
      throw error // Re-throw to handle in the component
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