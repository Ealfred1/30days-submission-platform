"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star } from "lucide-react"
import { useReviews } from "@/contexts/reviews-context"

export function ReviewFilters() {
  const { 
    searchTerm, 
    setSearchTerm, 
    projectFilter, 
    setProjectFilter, 
    ratingFilter, 
    setRatingFilter 
  } = useReviews()

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search reviews..." 
          className="pl-9" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="task-manager">Task Manager App</SelectItem>
            <SelectItem value="weather">Weather Dashboard</SelectItem>
            <SelectItem value="ecommerce">E-commerce UI</SelectItem>
            <SelectItem value="portfolio">Portfolio Website</SelectItem>
          </SelectContent>
        </Select>

        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">
              <div className="flex items-center gap-2">
                <span>5</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
            </SelectItem>
            <SelectItem value="4">
              <div className="flex items-center gap-2">
                <span>4</span>
                <div className="flex">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                  <Star className="h-3 w-3 text-muted" />
                </div>
              </div>
            </SelectItem>
            <SelectItem value="3">
              <div className="flex items-center gap-2">
                <span>3</span>
                <div className="flex">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-muted" />
                  ))}
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
