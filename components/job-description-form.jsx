"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface JobDescriptionFormProps {
  jobDescription
  setJobDescription: (description) => void
}

export function JobDescriptionForm({ jobDescription, setJobDescription }: JobDescriptionFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Job Description</h2>

      <div className="space-y-2">
        <Label htmlFor="jobDescription">Paste the job description here</Label>
        <Textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Copy and paste the full job description here. Our AI will analyze it to tailor your resume and cover letter."
          className="min-h-[300px]"
          required
        />
      </div>
    </div>
  )
}

