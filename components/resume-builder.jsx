"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { JobDescriptionForm } from "@/components/job-description-form"
import { ResumePreview } from "@/components/resume-preview"
import { CoverLetterPreview } from "@/components/cover-letter-preview"
import { Loader2, ArrowLeft } from "lucide-react"
import { SplashScreen } from "@/components/splash-screen"

export type PersonalInfo = {
  name
  email
  phone
  location
  summary
  experience
  education
  skills
}

export type GeneratedContent = {
  resume
  coverLetter
}

export function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  })
  const [jobDescription, setJobDescription] = useState("")
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [backToSplash, setBackToSplash] = useState(false)

  const handleGenerate = async () => {
    if (!personalInfo.name || !jobDescription) return

    setIsGenerating(true)

    try {
      // In a real implementation, this would call an API endpoint that uses the AI SDK
      // For demo purposes, we'll simulate the AI response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Sample generated content
      setGeneratedContent({
        resume: generateSampleResume(personalInfo, jobDescription),
        coverLetter: generateSampleCoverLetter(personalInfo, jobDescription),
      })

      setActiveTab("preview")
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (backToSplash) {
    return <SplashScreen />
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => setBackToSplash(true)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">AI Resume Builder</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate tailored resumes and cover letters based on job descriptions. Our AI analyzes the job requirements
          and optimizes your application materials to increase your chances of landing an interview.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">Information</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedContent}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6">
                <PersonalInfoForm personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
              </Card>
              <Card className="p-6">
                <JobDescriptionForm jobDescription={jobDescription} setJobDescription={setJobDescription} />
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  onClick={handleGenerate}
                  disabled={isGenerating || !personalInfo.name || !jobDescription}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Resume & Cover Letter"
                  )}
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            {generatedContent && (
              <Tabs defaultValue="resume" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
                </TabsList>

                <TabsContent value="resume">
                  <ResumePreview personalInfo={personalInfo} resumeContent={generatedContent.resume} />
                </TabsContent>

                <TabsContent value="coverLetter">
                  <CoverLetterPreview personalInfo={personalInfo} coverLetterContent={generatedContent.coverLetter} />
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Helper functions to generate sample content
function generateSampleResume(personalInfo: PersonalInfo, jobDescription) {
  const jobKeywords = extractKeywords(jobDescription)

  return `
## Professional Experience

### Senior Developer
XYZ Company | 2020 - Present

- Led development of cloud-based solutions utilizing ${jobKeywords.includes("AWS") ? "AWS" : "cloud technologies"}
- Implemented ${jobKeywords.includes("React") ? "React-based frontend applications" : "modern frontend frameworks"} with focus on performance
- ${jobKeywords.includes("agile") ? "Practiced Agile methodologies" : "Managed project timelines effectively"} across multiple teams
- ${jobKeywords.includes("API") ? "Designed RESTful APIs" : "Created backend services"} for enterprise applications

### Developer
ABC Tech | 2017 - 2020

- Developed ${jobKeywords.includes("mobile") ? "mobile applications" : "software solutions"} for diverse client needs
- Collaborated with cross-functional teams to deliver projects on schedule
- ${jobKeywords.includes("testing") ? "Implemented automated testing" : "Ensured code quality"} through best practices
- Mentored junior developers on ${jobKeywords.includes("JavaScript") ? "JavaScript" : "programming"} fundamentals

## Skills

${personalInfo.skills
  .split(",")
  .map((skill) => `- ${skill.trim()}`)
  .join("\n")}
${jobKeywords
  .filter((keyword) => !personalInfo.skills.toLowerCase().includes(keyword.toLowerCase()))
  .map((keyword) => `- ${keyword}`)
  .join("\n")}
  `
}

function generateSampleCoverLetter(personalInfo: PersonalInfo, jobDescription) {
  const jobKeywords = extractKeywords(jobDescription)
  const companyName = extractCompanyName(jobDescription) || "[Company Name]"

  return `
Dear Hiring Manager at ${companyName},

I am writing to express my interest in the position described in your job posting. With my background in ${personalInfo.summary.split(".")[0].toLowerCase()}, I believe I am well-positioned to contribute to your team.

The opportunity to work with ${jobKeywords.includes("innovative") ? "an innovative" : "a leading"} company like yours is particularly exciting to me. My experience with ${jobKeywords.slice(0, 3).join(", ")} aligns perfectly with the requirements outlined in your job description.

Throughout my career at previous companies, I have:
- Demonstrated expertise in ${jobKeywords[0] || "software development"}
- Successfully delivered projects utilizing ${jobKeywords[1] || "modern technologies"}
- Collaborated effectively with cross-functional teams to achieve ${jobKeywords[2] || "business objectives"}

I am particularly drawn to this role because it offers the opportunity to ${jobDescription.includes("challenge") ? "tackle challenging problems" : "contribute to meaningful projects"}. My approach to work emphasizes ${jobDescription.includes("team") ? "teamwork" : "quality and efficiency"}, which I believe makes me an excellent fit for your organization.

I would welcome the opportunity to discuss how my background, skills, and experiences would benefit ${companyName}. Thank you for considering my application.

Sincerely,
${personalInfo.name}
  `
}

function extractKeywords(text)[] {
  const commonKeywords = [
    "JavaScript",
    "React",
    "Node.js",
    "AWS",
    "Python",
    "API",
    "agile",
    "cloud",
    "DevOps",
    "mobile",
    "testing",
    "UI/UX",
    "database",
    "SQL",
    "NoSQL",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "innovative",
    "leadership",
    "communication",
  ]

  return commonKeywords.filter((keyword) => text.toLowerCase().includes(keyword.toLowerCase())).slice(0, 8)
}

function extractCompanyName(text) | null {
  // This is a simplified approach - in a real app, you might use NLP
  const companyPatterns = [
    /at\s+([A-Z][A-Za-z0-9\s]+)\s+we/i,
    /join\s+([A-Z][A-Za-z0-9\s]+)\s+as/i,
    /([A-Z][A-Za-z0-9\s]+)\s+is\s+looking/i,
    /([A-Z][A-Za-z0-9\s]+)\s+is\s+hiring/i,
  ]

  for (const pattern of companyPatterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return null
}

