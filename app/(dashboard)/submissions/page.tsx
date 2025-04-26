"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubmissionForm } from "@/components/submissions/submission-form"
import { SubmissionsList } from "@/components/submissions/submissions-list"

export default function SubmissionsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="max-w-4xl mx-auto w-full">
        <Tabs defaultValue="list" className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Submissions</h1>
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="list">My Submissions</TabsTrigger>
              <TabsTrigger value="submit">Submit Project</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list" className="space-y-6">
            <SubmissionsList />
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <SubmissionForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}