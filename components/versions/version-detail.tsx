"use client"

import { useEffect, useState } from "react"
import { Version, versionsApi } from "@/services/versions-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Target, 
  Award,
  ArrowLeft,
  Code,
  GitBranch,
  Timer
} from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function VersionDetail({ versionId }: { versionId: number }) {
  const [version, setVersion] = useState<Version | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await versionsApi.getById(versionId)
        setVersion(response)
      } catch (error) {
        console.error('Error fetching version:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVersion()
  }, [versionId])

  if (loading) return <div>Loading...</div>
  if (!version) return <div>Version not found</div>

  const daysLeft = differenceInDays(new Date(version.end_date), new Date())

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/versions" 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Versions
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  version.is_active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  <span className="text-3xl font-bold">v{version.number}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{version.name}</h1>
                  <p className="text-muted-foreground">{version.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Status & Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{version.progress_percentage}%</span>
                </div>
                <Progress value={version.progress_percentage} className="h-2" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {daysLeft} days remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Ends {format(new Date(version.end_date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Participants</span>
                  </div>
                  <p className="text-2xl font-bold">{version.participant_count}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Submissions</span>
                  </div>
                  <p className="text-2xl font-bold">{version.submission_count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technologies Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {version.technologies.length > 0 ? (
                  version.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">No technologies specified</span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Focus Area Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-full"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Focus Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {version.focus_area || "No focus area specified"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 