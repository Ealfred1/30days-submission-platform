"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Code, ExternalLink, FileCode, Github, Image, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export function SubmissionForm() {
  const [step, setStep] = useState(1)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const { toast } = useToast()

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    toast({
      title: "Project Submitted!",
      description: "Your project has been successfully submitted for review.",
    })
    // Reset form or redirect
    setStep(1)
  }

  const steps = [
    { id: 1, title: "Project Details" },
    { id: 2, title: "Code Repository" },
    { id: 3, title: "Media & Screenshots" },
    { id: 4, title: "Review & Submit" },
  ]

  return (
    <div className="space-y-8">
      {/* Steps indicator */}
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <motion.div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= s.id
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              animate={{
                scale: step === s.id ? 1.1 : 1,
                transition: { duration: 0.2 },
              }}
            >
              {step > s.id ? <Check className="h-5 w-5" /> : s.id}
            </motion.div>

            {i < steps.length - 1 && (
              <div className="mx-2 h-1 w-10 bg-muted">
                <motion.div
                  className="h-1 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: step > s.id ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-card p-6 border-border/30">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Project Details</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input id="project-title" placeholder="Enter your project title" className="input-futuristic" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Describe your project in detail..."
                      className="min-h-32 input-futuristic"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-tags">Technologies & Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="badge-futuristic gap-1">
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 rounded-full hover:bg-secondary/20 h-4 w-4 inline-flex items-center justify-center"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      id="project-tags"
                      placeholder="Add technologies (press Enter)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="input-futuristic"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Suggestions: React, Next.js, Tailwind CSS, TypeScript
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Code Repository</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      Repository URL
                    </Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/project"
                      className="input-futuristic"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="live-url" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo URL
                    </Label>
                    <Input id="live-url" placeholder="https://your-project.vercel.app" className="input-futuristic" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch" className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Branch
                    </Label>
                    <Input id="branch" placeholder="main" className="input-futuristic" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Media & Screenshots</h2>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                        <Image className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Upload Screenshots</h3>
                      <p className="text-sm text-muted-foreground">Drag and drop images or click to browse</p>
                      <Button variant="outline" className="mt-2 gap-2 border-primary/30 hover:bg-primary/10">
                        <Upload className="h-4 w-4" />
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preview-image">Preview Image URL</Label>
                    <Input
                      id="preview-image"
                      placeholder="https://example.com/image.png"
                      className="input-futuristic"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This will be the main image displayed for your project
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Review & Submit</h2>

                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4 border border-border/30">
                    <h3 className="font-medium mb-2">Project Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Title:</span>
                        <span className="font-medium">Task Manager App</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Repository:</span>
                        <span className="font-medium">github.com/username/project</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Live Demo:</span>
                        <span className="font-medium">project.vercel.app</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Technologies:</span>
                        <span className="font-medium">React, TypeScript, Tailwind</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final-notes">Additional Notes</Label>
                    <Textarea
                      id="final-notes"
                      placeholder="Any final notes for the reviewers?"
                      className="min-h-20 input-futuristic"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="border-primary/30 hover:bg-primary/10"
              >
                Back
              </Button>

              <Button
                onClick={() => {
                  if (step < steps.length) {
                    setStep(step + 1)
                  } else {
                    handleSubmit()
                  }
                }}
                className="btn-futuristic gap-2"
              >
                {step === steps.length ? (
                  <>
                    <FileCode className="h-4 w-4" />
                    Submit Project
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

