"use client"

import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MessageSquare, Star, ThumbsUp } from "lucide-react"
import { useReviews } from "@/contexts/reviews-context"
import Link from "next/link"

export function ReviewsList({ userId }: { userId?: string }) {
  const { reviews, fetchReviews, incrementHelpful } = useReviews()

  useEffect(() => {
    fetchReviews(userId)
  }, [userId, fetchReviews])

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="glass-card glass-card-hover">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Link href={`/profile/${review.user.id}`}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.user.avatar} alt={review.user.name} />
                    <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <Link href={`/profile/${review.user.id}`}>
                        <div className="font-medium hover:underline">{review.user.name}</div>
                      </Link>
                      <div className="text-sm text-muted-foreground">Reviewed: {review.project}</div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm">{review.comment}</p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      <span>{review.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      <button 
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => incrementHelpful(review.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {reviews.length === 0 && (
        <div className="text-center text-muted-foreground">
          No reviews yet
        </div>
      )}
    </div>
  )
}
