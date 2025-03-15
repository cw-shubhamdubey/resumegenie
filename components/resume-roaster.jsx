"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { SplashScreen } from "@/components/splash-screen"
import { ArrowLeft, Loader2, Zap, AlertTriangle, CheckCircle, FileUp, Download, Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FeedbackCategory = {
  title
  score
  description
  issues[]
  recommendations[]
}

type ResumeFeedback = {
  overallScore
  categories: FeedbackCategory[]
  beforeAfterExamples: {
    before
    after
    explanation
  }[]
  summary
}

export function ResumeRoaster() {
  const [resumeText, setResumeText] = useState("")
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [backToSplash, setBackToSplash] = useState(false)
  const [activeTab, setActiveTab] = useState("issues")
  const [copied, setCopied] = useState(false)

  const handleResumeTextChange = (text) => {
    setResumeText(text)
    if (text) {
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume is ready for analysis",
        variant: "success",
      })
    }
  }

  const handleCopy = async () => {
    if (!feedback) return

    const feedbackText = `
RESUME ANALYSIS REPORT

Overall Score: ${feedback.overallScore}/10

${feedback.categories
  .map(
    (category) => `
${category.title.toUpperCase()} (${category.score}/10)
${category.description}

Issues:
${category.issues.map((issue) => `- ${issue}`).join("\n")}

Recommendations:
${category.recommendations.map((rec) => `- ${rec}`).join("\n")}
`,
  )
  .join("\n")}

SUMMARY:
${feedback.summary}
`

    await navigator.clipboard.writeText(feedbackText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Feedback copied to clipboard",
      description: "You can now paste it anywhere",
      variant: "success",
    })
  }

  const handleRoast = async () => {
    if (!resumeText) {
      toast({
        title: "No resume found",
        description: "Please upload or paste your resume first",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setFeedback(null)

    try {
      // Simulate AI analysis with a timeout
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Analyze the resume text
      const analyzedFeedback = analyzeResume(resumeText)
      setFeedback(analyzedFeedback)

      toast({
        title: "Analysis complete",
        description: "Check out your detailed resume feedback",
        variant: "success",
      })
    } catch (error) {
      console.error("Error analyzing resume:", error)

      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeResume = (text): ResumeFeedback => {
    // This is a simulated analysis - in a real app, this would use AI

    // Check for common resume issues
    const hasActionVerbs = /achieved|improved|led|managed|developed|created|implemented/i.test(text)
    const hasMetrics = /increased|decreased|reduced|improved by \d+%|\d+%|saved \$\d+|\$\d+k/i.test(text)
    const hasSkillsSection = /skills|technologies|proficiencies/i.test(text)
    const hasDates = /\b(19|20)\d{2}\b|present|current/i.test(text)
    const hasObjective = /objective|summary|profile/i.test(text)
    const hasEducation = /education|university|college|degree|bachelor|master|phd/i.test(text)
    const hasContactInfo = /email|phone|linkedin|github/i.test(text)
    const hasPronouns = /\bI\b|\bmy\b|\bme\b/i.test(text)
    const hasGenericTerms = /hard worker|team player|detail-oriented|self-starter/i.test(text)
    const wordCount = text.split(/\s+/).length

    // Calculate category scores
    const impactScore = (hasActionVerbs ? 3 : 0) + (hasMetrics ? 4 : 0)
    const structureScore =
      (hasSkillsSection ? 2 : 0) +
      (hasDates ? 2 : 0) +
      (hasObjective ? 2 : 0) +
      (hasEducation ? 2 : 0) +
      (hasContactInfo ? 2 : 0)
    const clarityScore =
      (wordCount > 200 && wordCount < 600 ? 5 : 2) + (!hasPronouns ? 3 : 0) + (!hasGenericTerms ? 2 : 0)

    // Normalize scores to 0-10 range
    const normalizedImpactScore = Math.min(Math.max(Math.round(impactScore * 1.4), 1), 10)
    const normalizedStructureScore = Math.min(Math.max(Math.round(structureScore), 1), 10)
    const normalizedClarityScore = Math.min(Math.max(Math.round(clarityScore), 1), 10)

    // Calculate overall score
    const overallScore = Math.round((normalizedImpactScore + normalizedStructureScore + normalizedClarityScore) / 3)

    // Extract a sample bullet point for before/after example
    const bulletPoints = text.match(/[-•].*?(?=\n|$)/g) || ["Responsible for managing projects"]
    const sampleBullet = bulletPoints[0].replace(/^[-•]\s*/, "")

    // Create feedback object
    return {
      overallScore,
      categories: [
        {
          title: "Impact & Achievements",
          score: normalizedImpactScore,
          description:
            "How well your resume demonstrates concrete achievements and impact rather than just listing responsibilities.",
          issues: [
            hasActionVerbs
              ? "Some action verbs present, but could use more powerful ones"
              : "Lacks strong action verbs that demonstrate initiative and leadership",
            hasMetrics
              ? "Some metrics included, but not consistently throughout"
              : "Missing quantifiable achievements and metrics (numbers, percentages, dollar amounts)",
            "Achievements are not clearly distinguished from routine responsibilities",
            "Too focused on tasks rather than results and impact",
          ],
          recommendations: [
            "Start each bullet point with a strong action verb (e.g., 'Spearheaded', 'Orchestrated', 'Transformed')",
            "Add metrics to quantify your achievements (e.g., 'Increased sales by 27%', 'Reduced costs by $45K')",
            "Focus on outcomes and results, not just responsibilities",
            "Include at least one major achievement for each role",
          ],
        },
        {
          title: "Structure & Organization",
          score: normalizedStructureScore,
          description:
            "How well your resume is organized, formatted, and structured for easy scanning by both humans and ATS systems.",
          issues: [
            hasSkillsSection
              ? "Skills section could be better organized by categories"
              : "Missing a dedicated skills section",
            hasDates ? "Date format could be more consistent" : "Employment dates are missing or unclear",
            hasObjective ? "Summary/objective could be more compelling" : "Missing a professional summary or objective",
            "Section headings could be more prominent for better scannability",
            "Information hierarchy needs improvement for better visual flow",
          ],
          recommendations: [
            "Use a clean, consistent format with clear section headings",
            "Organize skills into categories (e.g., Technical, Soft Skills, Languages)",
            "Ensure consistent date formatting throughout (MM/YYYY is recommended)",
            "Place the most relevant information at the top of each section",
            "Use bullet points consistently (3-5 per role is ideal)",
          ],
        },
        {
          title: "Clarity & Language",
          score: normalizedClarityScore,
          description:
            "How clear, concise, and effective your language is, and how well it avoids common resume pitfalls.",
          issues: [
            wordCount < 200
              ? "Resume is too brief, lacking necessary detail"
              : wordCount > 600
                ? "Resume is too verbose, exceeding optimal length"
                : "Length is appropriate, but content could be more focused",
            hasPronouns
              ? "Contains personal pronouns (I, me, my) which should be avoided"
              : "Good job avoiding personal pronouns",
            hasGenericTerms
              ? "Contains generic buzzwords and clichés that lack specificity"
              : "Could use more industry-specific terminology",
            "Some phrases are passive rather than active",
            "Technical jargon needs better explanation for non-technical readers",
          ],
          recommendations: [
            "Aim for a 1-2 page resume depending on experience level",
            "Remove all personal pronouns (I, me, my)",
            "Replace generic terms like 'team player' with specific examples",
            "Use active voice consistently (e.g., 'Developed' instead of 'Was responsible for developing')",
            "Balance technical terms with clear explanations of their impact",
          ],
        },
      ],
      beforeAfterExamples: [
        {
          before: sampleBullet,
          after: sampleBullet
            .replace(/^Responsible for /i, "Led ")
            .replace(/managing/i, "orchestrating")
            .replace(/projects/i, "cross-functional projects, increasing delivery efficiency by 35%"),
          explanation:
            "The improved version starts with a stronger action verb, adds specificity, and includes a quantifiable achievement.",
        },
        {
          before: hasSkillsSection
            ? "Skills: JavaScript, React, Node.js"
            : "Proficient in various programming languages and frameworks",
          after:
            "Technical Skills: Frontend (JavaScript, React, Redux), Backend (Node.js, Express, MongoDB), DevOps (Docker, AWS, CI/CD)",
          explanation:
            "The improved version organizes skills by category and provides more specific details about technologies.",
        },
        {
          before: hasObjective
            ? "Looking for a challenging position where I can utilize my skills"
            : "Experienced professional seeking new opportunities",
          after:
            "Results-driven Software Engineer with 5+ years of experience building scalable web applications that drive business growth and enhance user experience",
          explanation:
            "The improved version is specific, achievement-oriented, and focused on value to the employer rather than personal goals.",
        },
      ],
      summary:
        overallScore >= 8
          ? "Your resume is strong overall, with just a few areas for improvement. Focus on enhancing your quantifiable achievements and ensuring consistent formatting to make it even more compelling."
          : overallScore >= 5
            ? "Your resume has good elements but needs significant improvement in how you present your achievements and structure your content. Implementing the recommendations will substantially increase your interview chances."
            : "Your resume requires major revisions to effectively showcase your qualifications. Focus on completely restructuring your content to highlight achievements with metrics and creating a more scannable format.",
    }
  }

  if (backToSplash) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto py-10 px-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button variant="ghost" className="mb-6 group" onClick={() => setBackToSplash(true)}>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <Zap className="h-10 w-10 text-amber-500" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
            <h1 className="text-4xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-red-600">
              Resume Roaster
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get honest, constructive feedback on your resume. Our AI will analyze your resume and provide actionable
            suggestions to make it stand out.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={feedback ? "lg:col-span-1" : "lg:col-span-2 max-w-2xl mx-auto w-full"}
          >
            <Card className="p-6 border-amber-200 shadow-lg shadow-amber-100/50">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center text-amber-700">
                  <FileUp className="mr-2 h-5 w-5 text-amber-500" />
                  Upload Your Resume
                </h2>

                <FileUploader onTextExtracted={handleResumeTextChange} />

                <div className="space-y-2">
                  <Label htmlFor="resumeText" className="text-amber-800">
                    Or paste your resume text
                  </Label>
                  <Textarea
                    id="resumeText"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste the content of your resume here..."
                    className="min-h-[200px] border-amber-200 focus-visible:ring-amber-500"
                  />
                </div>

                <Button
                  onClick={handleRoast}
                  disabled={isAnalyzing || !resumeText}
                  className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-400 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Get Honest Feedback
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </Card>
          </motion.div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="border-amber-200 shadow-lg shadow-amber-100/50 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-red-500 p-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white flex items-center">Resume Analysis</h2>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => window.print()}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className="text-sm font-bold">{feedback.overallScore}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className={`h-2.5 rounded-full ${
                          feedback.overallScore >= 8
                            ? "bg-green-500"
                            : feedback.overallScore >= 5
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${feedback.overallScore * 10}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Needs Work</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>

                  <Tabs defaultValue="issues" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="issues">Issues</TabsTrigger>
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                      <TabsTrigger value="categories">Categories</TabsTrigger>
                    </TabsList>

                    <TabsContent value="issues" className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-amber-800">Key Issues</h3>
                        <ul className="space-y-2">
                          {feedback.categories.flatMap((category) =>
                            category.issues.slice(0, 2).map((issue, i) => (
                              <li key={`${category.title}-issue-${i}`} className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{issue}</span>
                              </li>
                            )),
                          )}
                        </ul>

                        <h3 className="text-lg font-semibold text-green-700 mt-6">Top Recommendations</h3>
                        <ul className="space-y-2">
                          {feedback.categories.flatMap((category) =>
                            category.recommendations.slice(0, 2).map((rec, i) => (
                              <li key={`${category.title}-rec-${i}`} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{rec}</span>
                              </li>
                            )),
                          )}
                        </ul>

                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-6">
                          <h3 className="text-lg font-semibold text-amber-800 mb-2">Summary</h3>
                          <p>{feedback.summary}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="examples" className="space-y-6">
                      <h3 className="text-lg font-semibold text-amber-800">Before & After Examples</h3>

                      {feedback.beforeAfterExamples.map((example, i) => (
                        <div key={`example-${i}`} className="space-y-3 pb-6 border-b border-gray-200 last:border-0">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Original:</h4>
                            <div className="bg-gray-100 p-3 rounded-md text-gray-700">{example.before}</div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-green-600 mb-1">Improved:</h4>
                            <div className="bg-green-50 p-3 rounded-md text-gray-700 border-l-4 border-green-500">
                              {example.after}
                            </div>
                          </div>

                          <div className="text-sm text-gray-600 italic">
                            <span className="font-medium">Why it's better:</span> {example.explanation}
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="categories" className="space-y-6">
                      {feedback.categories.map((category, i) => (
                        <div key={`category-${i}`} className="space-y-3 pb-6 border-b border-gray-200 last:border-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-amber-800">{category.title}</h3>
                            <div className="flex items-center">
                              <span className="text-sm font-bold mr-2">{category.score}/10</span>
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <motion.div
                                  className={`h-2 rounded-full ${
                                    category.score >= 8
                                      ? "bg-green-500"
                                      : category.score >= 5
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                  }`}
                                  initial={{ width: "0%" }}
                                  animate={{ width: `${category.score * 10}%` }}
                                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 * i }}
                                />
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600">{category.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-red-600 mb-2">Issues:</h4>
                              <ul className="space-y-1">
                                {category.issues.map((issue, j) => (
                                  <li key={`${category.title}-issue-${j}`} className="flex items-start text-sm">
                                    <span className="text-red-500 mr-2">•</span>
                                    <span>{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-green-600 mb-2">Recommendations:</h4>
                              <ul className="space-y-1">
                                {category.recommendations.map((rec, j) => (
                                  <li key={`${category.title}-rec-${j}`} className="flex items-start text-sm">
                                    <span className="text-green-500 mr-2">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </motion.div>
          )}

          {!feedback && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2 max-w-4xl mx-auto"
            >
              <Card className="p-6 border-amber-200 shadow-lg shadow-amber-100/50">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                    <Zap className="h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-semibold text-amber-800 mb-1">Honest Feedback</h3>
                    <p className="text-sm text-gray-600">
                      Get brutally honest feedback about what's working and what's not in your resume
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-semibold text-amber-800 mb-1">Identify Issues</h3>
                    <p className="text-sm text-gray-600">
                      Discover hidden problems that might be causing recruiters to reject your resume
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-semibold text-amber-800 mb-1">Get Solutions</h3>
                    <p className="text-sm text-gray-600">
                      Receive actionable recommendations and before/after examples to improve your resume
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

