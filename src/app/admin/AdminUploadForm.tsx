'use client';

import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  previewUrls: string[];
  loading: boolean;
  error: string;
  success: string;
  categoriesMap: Record<string, string[]>;
  handleTitleChange:       (val: string) => void;
  handleDescriptionChange: (val: string) => void;
  handleMainCategoryChange:(val: string) => void;
  handleSubCategoryChange: (val: string) => void;
  handleMediaTypeChange:   (val: "image" | "video") => void;
  handleFileChange:        (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit:            (e: FormEvent<HTMLFormElement>) => void;
}

export default function AdminUploadForm({
  title,
  description,
  mainCategory,
  subCategory,
  mediaType,
  previewUrls,
  loading,
  error,
  success,
  categoriesMap,
  handleTitleChange,
  handleDescriptionChange,
  handleMainCategoryChange,
  handleSubCategoryChange,
  handleMediaTypeChange,
  handleFileChange,
  handleSubmit,
}: Props) {
  const mains = Object.keys(categoriesMap);
  const subs  = categoriesMap[mainCategory] || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-[#181924]/70 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl px-7 py-8 mt-8 space-y-5 transition"
    >
      <h2 className="text-2xl font-extrabold mb-4 text-white tracking-tight">
        Upload Portfolio Item
      </h2>

      {/* Title */}
      <div>
        <label className="block font-semibold text-gray-200 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold text-gray-200 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          rows={3}
        />
      </div>

      {/* Main Category */}
      <div>
        <label className="block font-semibold text-gray-200 mb-1">
          Main Category
        </label>
        <select
          value={mainCategory}
          onChange={e => handleMainCategoryChange(e.target.value)}
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        >
          <option value="" disabled>— Select main category —</option>
          {mains.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Sub Category */}
      <div>
        <label className="block font-semibold text-gray-200 mb-1">
          Sub Category
        </label>
        <select
          value={subCategory}
          onChange={e => handleSubCategoryChange(e.target.value)}
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        >
          <option value="" disabled>— Select sub category —</option>
          {subs.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Media Type */}
      <div>
        <label className="block font-semibold text-gray-200 mb-1">
          Media Type
        </label>
        <select
          value={mediaType}
          onChange={e => handleMediaTypeChange(e.target.value as "image"|"video")}
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      {/* File Input */}
      <div>
        <label className="block font-semibold text-gray-200 mb-1">
          Choose File(s)
        </label>
        <input
          type="file"
          accept={mediaType === "image" ? "image/*" : "video/*"}
          multiple={mediaType === "image"}
          onChange={handleFileChange}
          required
          className="file:bg-cyan-600 file:text-white file:rounded-lg file:py-2 file:px-4 file:font-semibold
            file:border-0 file:mr-3 bg-white/10 text-white
            border border-cyan-400/40 rounded-lg p-2 transition focus:outline-none"
        />
      </div>

      {/* Preview */}
      {previewUrls.length > 0 && (
        <div>
          <p className="font-semibold text-gray-200 mb-1">Preview:</p>
          <div className="flex flex-wrap gap-4">
            {previewUrls.map((url, i) => (
              <div key={i} className="rounded-xl border border-cyan-400/30 overflow-hidden bg-white/10 shadow-inner max-w-[180px]">
                {mediaType === "image" ? (
                  <img src={url} alt={`preview ${i}`} className="max-h-40 w-auto mx-auto block" />
                ) : (
                  <video src={url} controls className="max-h-40 w-auto mx-auto block" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow"
      >
        {loading ? "Uploading…" : "Upload"}
      </button>

      {error   && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
}
