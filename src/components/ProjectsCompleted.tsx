'use client'

import React from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { FaUsers, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa'

interface ProjectsCompletedProps {
  clientsServed: number
  projectsCompleted: number
  ongoingProjects: number
}

export default function ProjectsCompleted({
  clientsServed,
  projectsCompleted,
  ongoingProjects,
}: ProjectsCompletedProps) {
  const stats = [
    {
      label: 'Clients Served',
      value: clientsServed,
      icon: FaUsers,
      ring: 'from-blue-300 to-blue-500',
      glow: 'hover:shadow-blue-500/30',
    },
    {
      label: 'Projects Completed',
      value: projectsCompleted,
      icon: FaCheckCircle,
      ring: 'from-green-300 to-green-500',
      glow: 'hover:shadow-green-500/30',
    },
    {
      label: 'Ongoing Projects',
      value: ongoingProjects,
      icon: FaProjectDiagram,
      ring: 'from-yellow-300 to-yellow-500',
      glow: 'hover:shadow-yellow-500/30',
    },
  ]

  return (
<section className="w-full py-20 text-gray-900 bg-gradient-to-br from-white to-gray-50 relative z-10">
<div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We&apos;re proud to have partnered with visionary clients to bring bold ideas to life — creatively, and with measurable results.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
          {stats.map(({ label, value, icon: Icon, ring, glow }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`
                flex flex-col items-center backdrop-blur-xl bg-white/50 
                p-8 rounded-xl shadow-lg transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                border border-white/20 w-full max-w-xs text-center
              `}
            >
              <div
                className={`bg-gradient-to-br ${ring} p-4 rounded-full mb-4 shadow-lg transition-all transform ${glow}`}
              >
                <Icon className="text-white text-3xl" />
              </div>
              <div className="text-4xl font-extrabold text-gray-900">
                <CountUp end={value} duration={2} separator="," />
              </div>
              <p className="mt-2 text-gray-700 font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
