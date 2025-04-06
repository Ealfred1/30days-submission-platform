import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

export default function ParticipantsPage() {
  // Mock data for participants
  const participants = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Participant",
      submissions: 28,
      rank: 1,
      country: "United States",
      tags: ["React", "TypeScript"],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Participant",
      submissions: 27,
      rank: 2,
      country: "Canada",
      tags: ["Vue", "JavaScript"],
    },
    {
      id: 3,
      name: "Olivia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Participant",
      submissions: 26,
      rank: 3,
      country: "Spain",
      tags: ["Angular", "TypeScript"],
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Participant",
      submissions: 25,
      rank: 4,
      country: "South Korea",
      tags: ["React", "Next.js"],
    },
    {
      id: 5,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Participant",
      submissions: 24,
      rank: 5,
      country: "United Kingdom",
      tags: ["Svelte", "JavaScript"],
    },
  ]

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Participants</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search participants..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Participant</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Country</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Submissions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Tags</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="border-b border-border/30 last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm">#{participant.rank}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-primary/20">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{participant.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{participant.country}</td>
                    <td className="px-4 py-3 text-sm">{participant.submissions}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {participant.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
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

