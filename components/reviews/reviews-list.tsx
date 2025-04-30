"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useReviews } from "@/contexts/reviews-context"
import { Review } from "@/services/reviews-api"

export function ReviewsList() {
  const { reviews } = useReviews()

  // Handle loading state
  if (!reviews) {
    return <div>Loading...</div>
  }

  // Handle empty state
  if (reviews.length === 0) {
    return <div>No reviews found.</div>
  }

  return (
    <div className="space-y-6">
      {Array.isArray(reviews) && reviews.map((review: Review, index: number) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{review.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.project}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarFilledIcon key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2.5">{review.comment}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(review.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
