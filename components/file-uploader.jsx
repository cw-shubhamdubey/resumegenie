"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileText, X, Check, AlertCircle, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  onTextExtracted: (text) => void
}

export function FileUploader({ onTextExtracted }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFile = (file: File) => {
    // Reset states
    setUploadError(null)
    setUploadSuccess(false)
    setUploadProgress(0)

    // Check if file is PDF, DOCX, or TXT
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    if (
      !validTypes.includes(file.type) &&
      !file.name.endsWith(".pdf") &&
      !file.name.endsWith(".docx") &&
      !file.name.endsWith(".txt")
    ) {
      setUploadError("Please upload a PDF, DOCX, or TXT file")
      return
    }

    setFileName(file.name)
    setIsUploading(true)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 10
      })
    }, 200)

    // Read the file content
    const reader = new FileReader()

    reader.onload = (event) => {
      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        setIsUploading(false)
        setUploadSuccess(true)

        // For text files, we can directly use the result
        if (file.type === "text/plain") {
          const content = event.target?.result as string
          onTextExtracted(content)
        } else {
          // For PDF and DOCX, in a real app we would use a library to extract text
          // For this demo, we'll simulate extracted text based on the file name
          const extractedText = `RESUME: ${file.name}

JOHN DOE
john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years of experience in web development and cloud technologies.

WORK EXPERIENCE
Senior Developer | XYZ Company | 2020 - Present
- Responsible for managing projects and leading a team of 5 developers
- Worked on various web applications using React and Node.js
- Implemented CI/CD pipelines for automated testing and deployment

Developer | ABC Tech | 2017 - 2020
- Developed and maintained web applications
- Collaborated with cross-functional teams
- Participated in code reviews and mentored junior developers

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2017

SKILLS
JavaScript, React, Node.js, AWS, Python, Git, Docker, Agile methodologies`

          onTextExtracted(extractedText)
        }
      }, 500)
    }

    reader.onerror = () => {
      clearInterval(progressInterval)
      setIsUploading(false)
      setUploadError("Error reading file. Please try again.")
    }

    // Read the file as text
    if (file.type === "text/plain") {
      reader.readAsText(file)
    } else {
      // For PDF and DOCX, in a real app we would use a specific method
      // For this demo, we'll just trigger the onload event
      setTimeout(() => {
        if (reader.onload) {
          const event = { target: { result: "Simulated content" } } as unknown as ProgressEvent<FileReader>
          reader.onload(event)
        }
      }, 1500)
    }
  }

  const clearFile = () => {
    setFileName(null)
    setUploadSuccess(false)
    setUploadError(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onTextExtracted("")
  }

  return (
    <div className="space-y-4">
      {uploadError && (
        <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {fileName ? (
        <motion.div
          className={`flex flex-col p-4 border rounded-md ${
            uploadSuccess ? "bg-green-50 border-green-200" : "bg-muted/50"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <FileText className={`h-5 w-5 mr-2 ${uploadSuccess ? "text-green-500" : "text-blue-500"}`} />
                {uploadSuccess && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 flex items-center justify-center">
                    <Check className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>
              <div>
                <span className="text-sm font-medium truncate max-w-[200px] block">{fileName}</span>
                {uploadSuccess && <span className="text-xs text-green-600">Successfully processed</span>}
                {isUploading && <span className="text-xs text-blue-600">Processing file...</span>}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFile} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {isUploading && (
            <div className="mt-3">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}%</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          className={`border-2 border-dashed rounded-md p-8 text-center transition-all duration-200 ${
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-100"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.2, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <FileUp className="h-12 w-12 text-amber-500 relative z-10" />
            </div>
            <p className="text-base font-medium mt-2">Drag and drop your resume file here</p>
            <p className="text-sm text-muted-foreground">Supports PDF, DOCX, or TXT files</p>
            <Button
              variant="outline"
              size="lg"
              onClick={handleBrowseClick}
              className="relative overflow-hidden group border-amber-200 hover:border-amber-300 hover:bg-amber-50 mt-4"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center">
                <FileText className="mr-2 h-4 w-4 text-amber-500" />
                Browse Files
              </span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.docx,.txt"
              onChange={handleFileInput}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

