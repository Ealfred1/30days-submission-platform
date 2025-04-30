"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, Check, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Version, versionsApi } from "@/services/versions-api"
import { format } from "date-fns"
import Link from "next/link"

export function VersionTimeline() {
  const [versions, setVersions] = useState<Version[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const data = await versionsApi.getAll()
        setVersions(data)
      } catch (error) {
        console.error('Error fetching versions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVersions()
  }, []) 

  if (loading) {
    return <div>Loading versions...</div>
  }

  return (
    <div className="space-y-6">
      {versions.map((version, index) => (
        <Link key={version.id} href={`/versions/${version.id}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <Card
              className={`glass-card glass-card-hover relative overflow-hidden ${
                version.is_active ? "border-primary/50" : ""
              }`}
            >
              {version.is_active && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  Current
                </div>
              )}

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${
                        version.is_active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="text-2xl font-bold">v{version.number}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xl font-bold">{version.codename}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(version.start_date), 'MMMM yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{version.participant_count}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{version.name}</p>

                    {version.status === "completed" && (
                      <div className="flex items-center gap-1 text-sm text-green-500">
                        <Check className="h-4 w-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

