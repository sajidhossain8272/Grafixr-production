"use client";
import React from "react";

interface AdminNavigationProps {
  activeTab: "upload" | "list" | "categories" | "reviews" | "reviewManager";
  onTabChange: (
    tab: "upload" | "list" | "categories" | "reviews" | "reviewManager"
  ) => void;
}


export default function AdminNavigation({ activeTab, onTabChange }: AdminNavigationProps) {
  const tabs: { label: string; value: AdminNavigationProps["activeTab"] }[] = [
    { label: "Upload", value: "upload" },
    { label: "Manage Items", value: "list" },
    { label: "Categories", value: "categories" },
    { label: "Reviews", value: "reviews" },
    { label: "Review Manager", value: "reviewManager" }, // ✅ New Tab

  ];

  return (
    <div className="flex border-b border-gray-300 mb-4 bg-white shadow-sm">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onTabChange(value)}
          className={`py-2 px-6 focus:outline-none transition-colors ${
            activeTab === value
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
