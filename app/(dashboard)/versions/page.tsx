import { VersionTimeline } from "@/components/versions/version-timeline"
import { VersionComparison } from "@/components/versions/version-comparison"

export default function VersionsPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">Challenge Versions</h1>
      <VersionTimeline />
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Compare Versions</h2>
        <VersionComparison />
      </div>
    </div>
  )
}

