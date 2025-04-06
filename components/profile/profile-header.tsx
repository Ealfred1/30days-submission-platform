"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Github, Globe, Mail, MapPin, Twitter } from "lucide-react"

export function ProfileHeader() {
  return (
    <Card className="glass-card overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="-mt-16"
          >
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">Frontend Developer</p>
              </div>

              <Button>Edit Profile</Button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>johndoe</span>
              </div>
              <div className="flex items-center gap-1">
                <Twitter className="h-4 w-4" />
                <span>@johndoe</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>johndoe.dev</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">UI/UX</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

