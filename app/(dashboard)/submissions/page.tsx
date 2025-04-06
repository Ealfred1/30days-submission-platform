import { SubmissionForm } from "@/components/submissions/submission-form"

export default function SubmissionsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Submit Your Project</h1>
        <SubmissionForm />
      </div>
    </div>
  )
}

