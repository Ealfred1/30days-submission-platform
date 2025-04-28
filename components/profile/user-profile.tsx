"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useReviews } from "@/contexts/reviews-context"

interface User {
  id: number
  name: string
  avatar: string
  email: string
  bio: string
  points: number
  submissions_count: number
  average_rating: number
}

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)
  const { addReview } = useReviews()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`)
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }
    fetchUser()
  }, [userId])

  const handleSubmitReview = async () => {
    if (!user || !rating || !comment) return

    try {
      await addReview({
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        },
        project: "User Profile", // You might want to customize this
        rating,
        comment
      })
      
      // Reset form
      setRating(0)
      setComment("")
    } catch (error) {
      console.error("Failed to submit review:", error)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User Info Section */}
          <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Points</span>
                <span>{user.points}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Submissions</span>
                <span>{user.submissions_count}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Average Rating</span>
                <div className="flex items-center gap-1">
                  <span>{user.average_rating.toFixed(1)}</span>
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Review Form Section */}
          <div className="md:w-2/3 space-y-4">
            <h3 className="text-xl font-semibold">Leave a Review</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredStar || rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleSubmitReview}
              disabled={!rating || !comment}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 