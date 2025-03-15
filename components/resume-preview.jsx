"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"
import type { PersonalInfo } from "@/components/resume-builder"
import ReactMarkdown from "react-markdown"

interface ResumePreviewProps {
  personalInfo: PersonalInfo
  resumeContent
}

export function ResumePreview({ personalInfo, resumeContent }: ResumePreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const fullContent = `# ${personalInfo.name}
${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}

## Summary
${personalInfo.summary}

${resumeContent}

## Education
${personalInfo.education}
`

    await navigator.clipboard.writeText(fullContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const fullContent = `# ${personalInfo.name}
${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}

## Summary
${personalInfo.summary}

${resumeContent}

## Education
${personalInfo.education}
`

    const blob = new Blob([fullContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="default" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="p-8 bg-white text-black">
        <div className="prose max-w-none">
          <h1 className="text-2xl font-bold mb-1">{personalInfo.name}</h1>
          <p className="text-sm mb-4">
            {personalInfo.email && personalInfo.email}
            {personalInfo.email && personalInfo.phone && " | "}
            {personalInfo.phone && personalInfo.phone}
            {(personalInfo.email || personalInfo.phone) && personalInfo.location && " | "}
            {personalInfo.location && personalInfo.location}
          </p>

          {personalInfo.summary && (
            <>
              <h2 className="text-lg font-semibold mt-4 mb-2">Summary</h2>
              <p>{personalInfo.summary}</p>
            </>
          )}

          <ReactMarkdown>{resumeContent}</ReactMarkdown>

          {personalInfo.education && (
            <>
              <h2 className="text-lg font-semibold mt-4 mb-2">Education</h2>
              <p>{personalInfo.education}</p>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

