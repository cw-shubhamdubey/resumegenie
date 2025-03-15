"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"
import type { PersonalInfo } from "@/components/resume-builder"
import ReactMarkdown from "react-markdown"

interface CoverLetterPreviewProps {
  personalInfo: PersonalInfo
  coverLetterContent
}

export function CoverLetterPreview({ personalInfo, coverLetterContent }: CoverLetterPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetterContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([coverLetterContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${personalInfo.name.replace(/\s+/g, "_")}_Cover_Letter.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cover Letter Preview</h2>
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
          <div className="mb-8">
            <p>{personalInfo.name}</p>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          <ReactMarkdown>{coverLetterContent}</ReactMarkdown>
        </div>
      </Card>
    </div>
  )
}

