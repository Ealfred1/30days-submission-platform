"use client"

import { useSubmissions } from "@/providers/submission-provider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Code2, ExternalLink, Github, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function SubmissionsList() {
  const { submissions, loading } = useSubmissions()

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 glass-card animate-pulse">
            <div className="h-4 w-1/4 bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded mt-4" />
            <div className="h-4 w-1/2 bg-muted rounded mt-4" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Link href={`/submissions/${submission.id}`} key={submission.id}>
          <Card className="p-6 glass-card hover-scale">
            <div className="flex items-start gap-6">
              {/* Preview Image */}
              <div className="relative aspect-video w-48 rounded-lg overflow-hidden border">
                <Image
                  src={submission.preview_image || "/placeholder-project.png"}
                  alt={submission.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{submission.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {submission.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {submission.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Day {submission.day_number}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code2 className="h-4 w-4" />
                    <span>{formatDistanceToNow(new Date(submission.created_at))} ago</span>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    Repository
                  </Button>
                  {submission.live_demo_url && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
} 