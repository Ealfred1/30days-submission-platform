"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { adminApi, Version } from "@/services/admin-api"
import { useToast } from "@/components/ui/use-toast"

export default function AdminVersionsPage() {
  const [versions, setVersions] = useState<Version[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchVersions()
  }, [])

  const fetchVersions = async () => {
    try {
      const data = await adminApi.getVersions()
      setVersions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch versions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateVersion = async (data: Partial<Version>) => {
    try {
      await adminApi.createVersion(data)
      toast({
        title: "Success",
        description: "Version created successfully",
      })
      fetchVersions()
      setIsCreating(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create version",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Versions</h1>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Version
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Version</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleCreateVersion({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                status: 'draft'
              })
            }}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input name="title" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea name="description" required />
              </div>
              <Button type="submit" className="w-full">Create Version</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>All Versions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Version</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Submissions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {versions.map((version) => (
                  <tr key={version.id} className="border-b border-border/30">
                    <td className="px-4 py-3">
                      <div className="font-medium">{version.title}</div>
                      <div className="text-sm text-muted-foreground">{version.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        version.status === 'published' ? 'bg-green-500/10 text-green-500' :
                        version.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {version.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{version.submissions_count}</td>
                    <td className="px-4 py-3">{new Date(version.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 