"use client"
import { createContext, useContext, useState } from "react"

interface Review {
  id: number
  user: {
    id: number
    name: string
    avatar: string
  }
  project: string
  rating: number
  comment: string
  date: string
  helpful: number
}

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
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const fetchReviews = async (userId?: string) => {
    try {
      const url = userId 
        ? `/api/reviews?userId=${userId}`
        : '/api/reviews'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.results || [])
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
    }
  }

  const incrementHelpful = async (reviewId: number) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: "POST",
      })
      if (response.ok) {
        setReviews(reviews.map(review => 
          review.id === reviewId 
            ? { ...review, helpful: review.helpful + 1 }
            : review
        ))
      }
    } catch (error) {
      console.error("Failed to increment helpful count:", error)
    }
  }

  const addReview = async (review: Omit<Review, "id" | "date" | "helpful">) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      })
      if (response.ok) {
        const newReview = await response.json()
        setReviews([newReview, ...reviews])
      }
    } catch (error) {
      console.error("Failed to add review:", error)
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