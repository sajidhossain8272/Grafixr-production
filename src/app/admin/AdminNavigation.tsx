"use client";
import React from "react";

interface AdminNavigationProps {
  activeTab:
    | "upload"
    | "list"
    | "categories"
    | "reviews"
    | "reviewManager"
    | "newsletter";
  onTabChange: (
    tab:
      | "upload"
      | "list"
      | "categories"
      | "reviews"
      | "reviewManager"
      | "newsletter"
  ) => void;
}

export default function AdminNavigation({ activeTab, onTabChange }: AdminNavigationProps) {
  const tabs: { label: string; value: AdminNavigationProps["activeTab"] }[] = [
    { label: "Upload", value: "upload" },
    { label: "Manage Items", value: "list" },
    { label: "Categories", value: "categories" },
    { label: "Reviews", value: "reviews" },
    { label: "Review Manager", value: "reviewManager" },
    { label: "Newsletter", value: "newsletter" },
  ];

  return (
    <div className="flex gap-2 md:gap-3 py-2 px-2 rounded-2xl bg-[#191a20]/80 border border-white/10 shadow mb-7 backdrop-blur-sm overflow-x-auto">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onTabChange(value)}
          className={`py-2 px-5 md:px-7 rounded-xl text-base md:text-lg transition-all duration-150
            ${
              activeTab === value
                ? "bg-gradient-to-r from-cyan-400/30 to-pink-400/20 text-cyan-300 font-bold shadow-md border border-cyan-300"
                : "text-gray-300 hover:text-cyan-200 hover:bg-cyan-400/10 border border-transparent"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
