"use client"

import { useEffect, useState } from "react"
import { useSubmissions } from "@/providers/submission-provider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Code2, ExternalLink, Github, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const { getSubmission } = useSubmissions()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubmission = async () => {
      const data = await getSubmission(parseInt(params.id))
      if (data) {
        setSubmission(data)
      }
      setLoading(false)
    }
    fetchSubmission()
  }, [params.id, getSubmission])

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto w-full">
          <Card className="p-6 glass-card animate-pulse">
            {/* Add loading skeleton here */}
          </Card>
        </div>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto w-full">
          <Card className="p-6 glass-card">
            <h1 className="text-2xl font-bold">Submission not found</h1>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card className="p-6 glass-card">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{submission.title}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                Repository
              </Button>
              {submission.live_demo_url && (
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              )}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Day {submission.day_number}</span>
            </div>
            <div className="flex items-center gap-1">
              <Code2 className="h-4 w-4" />
              <span>{formatDistanceToNow(new Date(submission.created_at))} ago</span>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {submission.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">
            {submission.description}
          </p>

          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Screenshots</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image
                  src={submission.preview_image || "/placeholder-project.png"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              {submission.additional_images?.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 