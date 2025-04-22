// components/ProjectsCompleted.tsx
'use client'

import React from 'react'
import CountUp from 'react-countup'
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
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Projects Completed',
      value: projectsCompleted,
      icon: FaCheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Ongoing Projects',
      value: ongoingProjects,
      icon: FaProjectDiagram,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
  ]

  return (
    <section className="py-16 text-gray-900 relative overflow-hidden z-10 ">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Achievements
        </h2>
        <p className="text-gray-600">
          We’re proud to have partnered with amazing clients, delivered
          outstanding projects, and continue to innovate every day.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
            <div
              key={label}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1"
            >
              <div
                className={`
                  ${iconBg} 
                  p-4 rounded-full mb-4
                `}
              >
                <Icon className={`${iconColor} text-4xl`} />
              </div>
              <CountUp
                end={value}
                duration={2}
                separator=","
                className="text-4xl font-extrabold text-gray-900"
              />
              <p className="mt-2 text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
