"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BarChart3, LineChart, PieChart } from "lucide-react"

export function VersionComparison() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select defaultValue="7">
            <SelectTrigger>
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Version 7 - Kairos</SelectItem>
              <SelectItem value="6">Version 6 - Chronos</SelectItem>
              <SelectItem value="5">Version 5 - Helios</SelectItem>
              <SelectItem value="4">Version 4 - Atlas</SelectItem>
              <SelectItem value="3">Version 3 - Poseidon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select defaultValue="6">
            <SelectTrigger>
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Version 7 - Kairos</SelectItem>
              <SelectItem value="6">Version 6 - Chronos</SelectItem>
              <SelectItem value="5">Version 5 - Helios</SelectItem>
              <SelectItem value="4">Version 4 - Atlas</SelectItem>
              <SelectItem value="3">Version 3 - Poseidon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
                    Version 7 (Kairos): 248 participants
                    <br />
                    Version 6 (Chronos): 215 participants
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
                    Version 7 (Kairos): 3,248 submissions
                    <br />
                    Version 6 (Chronos): 2,795 submissions
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
                  <p className="text-muted-foreground">Technologies Comparison Chart</p>
                  <p className="text-xs text-muted-foreground mt-2">Most popular technologies by version</p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

