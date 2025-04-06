"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MessageSquare, Star, ThumbsUp } from "lucide-react"

export function ReviewsList() {
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Task Manager App",
      rating: 5,
      comment:
        "This is an excellent project! The UI is intuitive and the code is well-structured. I particularly liked the drag and drop functionality for task management.",
      date: "2 days ago",
      helpful: 12,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Weather Dashboard",
      rating: 4,
      comment:
        "Great project overall. The weather data visualization is impressive. I would suggest adding more filter options for the forecast view.",
      date: "3 days ago",
      helpful: 8,
    },
    {
      id: 3,
      user: {
        name: "Olivia Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "E-commerce UI",
      rating: 5,
      comment:
        "One of the best e-commerce interfaces I've seen in this challenge. The product filtering and cart functionality are seamless. The responsive design works perfectly on all devices.",
      date: "4 days ago",
      helpful: 15,
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Portfolio Website",
      rating: 4,
      comment:
        "Clean and professional portfolio design. The project showcase section is well-organized. I would recommend adding more interactive elements to make it stand out.",
      date: "5 days ago",
      helpful: 6,
    },
  ]

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
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-medium">{review.user.name}</div>
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
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
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
    </div>
  )
}

