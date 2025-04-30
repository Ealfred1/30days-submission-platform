import { VersionDetail } from "@/components/versions/version-detail"

export default function VersionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 md:p-10">
      <VersionDetail versionId={parseInt(params.id)} />
    </div>
  )
} 