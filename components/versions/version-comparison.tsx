"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BarChart3, LineChart, PieChart } from "lucide-react"
import { useEffect, useState } from "react"
import { Version, VersionComparison as IVersionComparison, versionsApi } from "@/services/versions-api"

export function VersionComparison() {
  const [versions, setVersions] = useState<Version[]>([])
  const [selectedVersion1, setSelectedVersion1] = useState<string>()
  const [selectedVersion2, setSelectedVersion2] = useState<string>()
  const [comparison, setComparison] = useState<IVersionComparison>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const data = await versionsApi.getAll()
        setVersions(data)
        // Set default selections
        if (data.length >= 2) {
          setSelectedVersion1(data[0].id.toString())
          setSelectedVersion2(data[1].id.toString())
        }
      } catch (error) {
        console.error('Error fetching versions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVersions()
  }, [])

  useEffect(() => {
    const compareVersions = async () => {
      if (selectedVersion1 && selectedVersion2) {
        try {
          const data = await versionsApi.compare(
            parseInt(selectedVersion1),
            parseInt(selectedVersion2)
          )
          setComparison(data)
        } catch (error) {
          console.error('Error comparing versions:', error)
        }
      }
    }

    compareVersions()
  }, [selectedVersion1, selectedVersion2])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select 
            value={selectedVersion1} 
            onValueChange={setSelectedVersion1}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              {versions.map(version => (
                <SelectItem 
                  key={version.id} 
                  value={version.id.toString()}
                >
                  Version {version.number} - {version.codename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select 
            value={selectedVersion2} 
            onValueChange={setSelectedVersion2}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              {versions.map(version => (
                <SelectItem 
                  key={version.id} 
                  value={version.id.toString()}
                >
                  Version {version.number} - {version.codename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {comparison && (
        <Card className="glass-card">
          <CardContent className="p-6">
            <Tabs defaultValue="participants">
              <TabsList className="mb-6">
                <TabsTrigger value="participants" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span>Participants</span>
                </TabsTrigger>
                <TabsTrigger value="submissions" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Submissions</span>
                </TabsTrigger>
                <TabsTrigger value="technologies" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Technologies</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="participants">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground">Participants Comparison Chart</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {comparison.version1.codename}: {comparison.version1.participant_count} participants
                      <br />
                      {comparison.version2.codename}: {comparison.version2.participant_count} participants
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="submissions">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground">Submissions Comparison Chart</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {comparison.version1.codename}: {comparison.version1.submission_count} submissions
                      <br />
                      {comparison.version2.codename}: {comparison.version2.submission_count} submissions
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="technologies">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground">Technologies Comparison</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Common technologies: {comparison.technology_overlap.join(", ")}
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

