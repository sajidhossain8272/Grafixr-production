'use client';

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaUsers,
  FaCheckCircle,
  FaProjectDiagram
} from "react-icons/fa";

interface ProjectsCompletedProps {
  clientsServed: number;
  projectsCompleted: number;
  ongoingProjects: number;
}

export default function ProjectsCompleted({
  clientsServed,
  projectsCompleted,
  ongoingProjects,
}: ProjectsCompletedProps) {
  const stats = [
    {
      label: "Clients Served",
      value: clientsServed,
      icon: FaUsers,
      ring: "from-blue-400 to-blue-600",
      glow: "hover:shadow-blue-400/40",
    },
    {
      label: "Projects Completed",
      value: projectsCompleted,
      icon: FaCheckCircle,
      ring: "from-green-400 to-green-600",
      glow: "hover:shadow-green-400/40",
    },
    {
      label: "Ongoing Projects",
      value: ongoingProjects,
      icon: FaProjectDiagram,
      ring: "from-yellow-400 to-yellow-600",
      glow: "hover:shadow-yellow-400/40",
    },
  ];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto px-4"
      >
        {stats.map(({ label, value, icon: Icon, ring, glow }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`relative p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-center shadow-lg transition-all hover:-translate-y-1 duration-300 w-full max-w-xs ${glow}`}
          >
            <div
              className={`bg-gradient-to-br ${ring} p-4 rounded-full shadow-xl mx-auto mb-4`}
            >
              <Icon className="text-white text-3xl drop-shadow" />
            </div>
            <h3 className="text-4xl font-bold text-white drop-shadow">
              <CountUp end={value} duration={2} separator="," />
            </h3>
            <p className="text-gray-300 mt-2 font-medium">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
