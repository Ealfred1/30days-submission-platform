import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StatisticsPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Statistics</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Submission Frequency Chart</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Rating Distribution Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Submission Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Submission Analytics Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Performance Metrics Chart</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

