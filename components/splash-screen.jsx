"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ResumeBuilder } from "@/components/resume-builder"
import { ResumeRoaster } from "@/components/resume-roaster"
import { FileText, Zap } from "lucide-react"

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)
  const [selectedOption, setSelectedOption] = useState<"build" | "roast" | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleOptionSelect = (option: "build" | "roast") => {
    setSelectedOption(option)
    setShowSplash(false)
  }

  if (!showSplash) {
    return selectedOption === "build" ? <ResumeBuilder /> : <ResumeRoaster />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-5">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000"></circle>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 py-20 flex flex-col items-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-200 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-200 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-200 opacity-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Logo and title */}
        <motion.div
          className="relative z-10 mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-4 relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
              {/* Genie SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-20 h-20 absolute"
                style={{ filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))" }}
              >
                {/* Genie lamp base */}
                <motion.path
                  d="M30,70 C30,70 35,80 50,80 C65,80 70,70 70,70 L75,75 C75,75 65,90 50,90 C35,90 25,75 25,75 L30,70"
                  fill="#9333ea"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />

                {/* Lamp handle */}
                <motion.path
                  d="M70,70 C70,70 75,65 75,60 C75,55 70,55 70,55 L80,50 C80,50 85,55 85,60 C85,65 80,70 75,75 L70,70"
                  fill="#9333ea"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />

                {/* Genie smoke/body */}
                <motion.path
                  d="M50,20 C60,20 65,30 65,40 C65,45 60,55 60,60 C60,65 65,70 65,75 C65,85 55,90 50,90 C45,90 35,85 35,75 C35,70 40,65 40,60 C40,55 35,45 35,40 C35,30 40,20 50,20 Z"
                  fill="url(#gradient-genie)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Genie eyes */}
                <motion.circle
                  cx="43"
                  cy="40"
                  r="3"
                  fill="white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                />
                <motion.circle
                  cx="57"
                  cy="40"
                  r="3"
                  fill="white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                />

                {/* Genie smile */}
                <motion.path
                  d="M43,50 Q50,55 57,50"
                  stroke="white"
                  strokeWidth="2"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />

                {/* Genie turban */}
                <motion.path
                  d="M30,25 Q40,15 50,20 Q60,15 70,25"
                  stroke="#c084fc"
                  strokeWidth="3"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                />

                {/* Turban jewel */}
                <motion.circle
                  cx="50"
                  cy="20"
                  r="3"
                  fill="#f0abfc"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient-genie" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#7e22ce" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Document icon behind the genie */}
              <FileText className="w-16 h-16 text-white opacity-30" />

              {/* Magical sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + Math.random() * 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            ResumeGenie
          </motion.h1>

          <motion.div
            className="mt-2 text-lg text-gray-600 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <p className="relative inline-block">
              Made by
              <span className="font-semibold relative mx-1 text-purple-700">
                Shubham Dubey
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Options */}
        {animationComplete && (
          <motion.div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <div
                onClick={() => handleOptionSelect("roast")}
                className="relative w-full h-44 rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/90 to-red-600/90 group-hover:from-amber-500 group-hover:to-red-500 transition-all duration-300" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-white">
                  <div className="relative mb-3">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform scale-150 group-hover:scale-[2] transition-all duration-500" />
                    <Zap className="w-10 h-10 relative z-10 group-hover:text-yellow-200 transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    Roast My Resume
                  </h3>

                  <p className="text-sm text-center text-white/90 max-w-[80%]">
                    Get honest, detailed feedback on your current resume
                  </p>

                  <motion.div
                    className="absolute bottom-4 right-4 bg-white/20 rounded-full p-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <div
                onClick={() => handleOptionSelect("build")}
                className="relative w-full h-44 rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/90 to-purple-700/90 group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-300" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-white">
                  <div className="relative mb-3">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform scale-150 group-hover:scale-[2] transition-all duration-500" />
                    <FileText className="w-10 h-10 relative z-10 group-hover:text-blue-200 transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                    Make My Resume
                  </h3>

                  <p className="text-sm text-center text-white/90 max-w-[80%]">
                    Create a professional, ATS-friendly resume
                  </p>

                  <motion.div
                    className="absolute bottom-4 right-4 bg-white/20 rounded-full p-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background:
                  i % 3 === 0
                    ? "linear-gradient(to right, #c084fc, #a855f7)"
                    : i % 3 === 1
                      ? "linear-gradient(to right, #f59e0b, #ef4444)"
                      : "linear-gradient(to right, #60a5fa, #3b82f6)",
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [0, -Math.random() * 100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [Math.random() * 0.5 + 0.2, 0],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

