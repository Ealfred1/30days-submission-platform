"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, ExternalLink, Github, Star } from "lucide-react"

export function ProfileSubmissions() {
  const submissions = [
    {
      id: 1,
      title: "Task Manager App",
      description: "A simple task manager application with drag and drop functionality.",
      date: "Day 24 - Apr 24, 2023",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      rating: 4.8,
      repoUrl: "#",
      demoUrl: "#",
      imageUrl: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "A weather dashboard that shows current and forecasted weather for multiple locations.",
      date: "Day 18 - Apr 18, 2023",
      tags: ["React", "TypeScript", "Chart.js"],
      rating: 4.6,
      repoUrl: "#",
      demoUrl: "#",
      imageUrl: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 3,
      title: "E-commerce UI",
      description: "A responsive e-commerce user interface with product listings and cart functionality.",
      date: "Day 12 - Apr 12, 2023",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      rating: 4.9,
      repoUrl: "#",
      demoUrl: "#",
      imageUrl: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A personal portfolio website with project showcase and contact form.",
      date: "Day 6 - Apr 6, 2023",
      tags: ["HTML", "CSS", "JavaScript"],
      rating: 4.5,
      repoUrl: "#",
      demoUrl: "#",
      imageUrl: "/placeholder.svg?height=150&width=300",
    },
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Submissions</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="md:w-1/3">
                  <img
                    src={submission.imageUrl || "/placeholder.svg"}
                    alt={submission.title}
                    className="w-full h-auto rounded-md object-cover aspect-video"
                  />
                </div>

                <div className="md:w-2/3 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold">{submission.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{submission.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{submission.description}</p>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{submission.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {submission.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-2">
                    <a
                      href={submission.repoUrl}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-3 w-3" />
                      <span>Repository</span>
                    </a>
                    <a
                      href={submission.demoUrl}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="recent">
            <div className="p-8 text-center text-muted-foreground">Showing recent submissions...</div>
          </TabsContent>

          <TabsContent value="top-rated">
            <div className="p-8 text-center text-muted-foreground">Showing top rated submissions...</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

