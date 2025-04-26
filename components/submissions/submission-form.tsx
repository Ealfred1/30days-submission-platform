"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Code, ExternalLink, FileCode, Github, Image, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import api from "@/services/api"
import { useSubmissions } from "@/providers/submission-provider"
import { useDropzone } from "react-dropzone"
import ImageNext from "next/image"

type SubmissionFormData = {
  title: string
  description: string
  repository_url: string
  live_demo_url?: string
  branch: string
  technologies: string[]
  day_number: number
  preview_image_file?: File
  additional_images?: File[]
}

// Suggested technologies 
const SUGGESTED_TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "MongoDB",
]

export function SubmissionForm() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SubmissionFormData>()
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const { toast } = useToast()
  const { createSubmission } = useSubmissions()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<Array<{ file: File; preview: string }>>([])

  // Watch form values for validation
  const formValues = watch()

  const handleAddTag = (tag: string) => {
    if (tag.trim() !== "" && !tags.includes(tag.trim())) {
      const newTags = [...tags, tag.trim()]
      setTags(newTags)
      setValue('technologies', newTags)
    }
    setTagInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag(tagInput)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    setValue('technologies', newTags)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [mainFile, ...otherFiles] = acceptedFiles;
    
    // Handle main preview image
    if (mainFile && !previewImage) {
      setValue('preview_image_file', mainFile)
      const previewUrl = URL.createObjectURL(mainFile)
      setPreviewImage(previewUrl)
    }
    
    // Handle additional images (up to 5 total)
    const remainingSlots = 5 - additionalImages.length
    const newImages = otherFiles.slice(0, remainingSlots).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    
    if (newImages.length > 0) {
      const updatedImages = [...additionalImages, ...newImages]
      setAdditionalImages(updatedImages)
      setValue('additional_images', updatedImages.map(img => img.file))
    }
  }, [setValue, additionalImages, previewImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 6, // Main preview + 5 additional
  })

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage)
      additionalImages.forEach(img => URL.revokeObjectURL(img.preview))
    }
  }, [previewImage, additionalImages])

  // Remove main preview image
  const removeMainPreview = () => {
    if (previewImage) URL.revokeObjectURL(previewImage)
    setPreviewImage(null)
    setValue('preview_image_file', undefined)
  }

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    URL.revokeObjectURL(additionalImages[index].preview)
    const newImages = additionalImages.filter((_, i) => i !== index)
    setAdditionalImages(newImages)
    setValue('additional_images', newImages.map(img => img.file))
  }

  const formatUrl = (url: string): string => {
    if (!url) return url;
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      const formData = new FormData();
      
      // Add basic fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('repository_url', data.repository_url);
      if (data.live_demo_url) {
        formData.append('live_demo_url', data.live_demo_url);
      }
      formData.append('branch', data.branch);
      formData.append('technologies', JSON.stringify(data.technologies));

      // Add main preview image
      if (data.preview_image_file) {
        formData.append('preview_image_file', data.preview_image_file);
      }
      
      // Add additional images
      if (data.additional_images?.length) {
        data.additional_images.forEach((file) => {
          formData.append('additional_images', file);
        });
      }

      await createSubmission(formData);

      toast({
        title: "Success!",
        description: "Your project has been submitted successfully.",
      });

      // Reset form
      setStep(1);
      setTags([]);
      setPreviewImage(null);
      setAdditionalImages([]);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit project",
        variant: "destructive",
      });
    }
  };

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
                    <Input id="project-title" placeholder="Enter your project title" className="input-futuristic" {...register("title")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Describe your project in detail..."
                      className="min-h-32 input-futuristic"
                      {...register("description")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Technologies & Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add technologies (press Enter)"
                      className="mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_TECHNOLOGIES.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => handleAddTag(tech)}
                        >
                          + {tech}
                        </Badge>
                      ))}
                    </div>
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
                      {...register("repository_url")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="live-url" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo URL
                    </Label>
                    <Input id="live-url" placeholder="https://your-project.vercel.app" className="input-futuristic" {...register("live_demo_url")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch" className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Branch
                    </Label>
                    <Input id="branch" placeholder="main" className="input-futuristic" {...register("branch")} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <motion.div>
                <Card className="glass-card h-full border-border/30">
                  <CardHeader>
                    <CardTitle>Media & Screenshots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Dropzone */}
                      <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <input {...getInputProps()} />
                        <p>Drag & drop images here, or click to select files</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          First image will be the main preview
                        </p>
                      </div>

                      {/* Main Preview Image */}
                      {previewImage && (
                        <div className="space-y-2">
                          <Label>Main Preview Image</Label>
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                            <ImageNext
                              src={previewImage}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeMainPreview}
                              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Additional Images */}
                      {additionalImages.length > 0 && (
                        <div className="space-y-2">
                          <Label>Additional Images ({additionalImages.length}/5)</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {additionalImages.map((img, index) => (
                              <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                <ImageNext
                                  src={img.preview}
                                  alt={`Additional image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeAdditionalImage(index)}
                                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        Supported formats: JPEG, PNG, GIF • Max 5 additional images
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div>
                <Card className="glass-card h-full border-border/30">
                  <CardHeader>
                    <CardTitle>Review & Submit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        <div>
                          <h3 className="font-medium">Project Title</h3>
                          <p className="text-muted-foreground">{formValues.title}</p>
                        </div>

                        <div>
                          <h3 className="font-medium">Description</h3>
                          <p className="text-muted-foreground">{formValues.description}</p>
                        </div>

                        <div>
                          <h3 className="font-medium">Technologies</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formValues.technologies?.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium">Repository</h3>
                          <p className="text-muted-foreground">{formValues.repository_url}</p>
                        </div>

                        {formValues.live_demo_url && (
                          <div>
                            <h3 className="font-medium">Live Demo</h3>
                            <p className="text-muted-foreground">{formValues.live_demo_url}</p>
                          </div>
                        )}

                        <div>
                          <h3 className="font-medium">Branch</h3>
                          <p className="text-muted-foreground">{formValues.branch}</p>
                        </div>

                        {previewImage && (
                          <div>
                            <h3 className="font-medium">Preview Image</h3>
                            <div className="mt-2 max-w-md">
                              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                <ImageNext
                                  src={previewImage}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={removeMainPreview}
                                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {additionalImages.length > 0 && (
                          <div>
                            <h3 className="font-medium">Additional Images ({additionalImages.length})</h3>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                              {additionalImages.map((img, index) => (
                                <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                  <ImageNext
                                    src={img.preview}
                                    alt={`Additional image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeAdditionalImage(index)}
                                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
                    handleSubmit(onSubmit)()
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

