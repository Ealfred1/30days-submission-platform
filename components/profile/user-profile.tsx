"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export function UserProfile({ userId }: { userId: string }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    fetchUser()
  }, [userId])

  const handleSubmitReview = async () => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          rating,
          comment,
        }),
      })

      if (response.ok) {
        toast({
          title: "Review submitted",
          description: "Thank you for your feedback!",
        })
        setRating(0)
        setComment("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      })
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="text-muted-foreground">{user.bio}</div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${
                      i < rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                    }`}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>

              <Textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4"
              />

              <Button onClick={handleSubmitReview} disabled={!rating || !comment}>
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 