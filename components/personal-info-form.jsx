"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PersonalInfo } from "@/components/resume-builder"

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo
  setPersonalInfo: (info: PersonalInfo) => void
}

export function PersonalInfoForm({ personalInfo, setPersonalInfo }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo({ ...personalInfo, [name]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="City, State"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Brief overview of your professional background and strengths"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Work Experience</Label>
        <Textarea
          id="experience"
          name="experience"
          value={personalInfo.experience}
          onChange={handleChange}
          placeholder="List your relevant work experience"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Textarea
          id="education"
          name="education"
          value={personalInfo.education}
          onChange={handleChange}
          placeholder="Your educational background"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          value={personalInfo.skills}
          onChange={handleChange}
          placeholder="List your skills, separated by commas"
          rows={3}
        />
      </div>
    </div>
  )
}

