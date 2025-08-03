"use client";

import React, { useState, FormEvent, KeyboardEvent } from "react";
import { toast } from "react-toastify";

interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
}

interface AdminCategoriesProps {
  categories: Category[];
  loading: boolean;
  API_URL: string;
  refresh: () => void;
}

const AdminCategories: React.FC<AdminCategoriesProps> = ({
  categories,
  loading,
  API_URL,
  refresh,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New‑category form
  const [newMainCategory, setNewMainCategory] = useState("");
  const [newSubCategories, setNewSubCategories] = useState<string[]>([]);
  const [newSubCategoryInput, setNewSubCategoryInput] = useState("");

  // Edit mode
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editSubCategories, setEditSubCategories] = useState<string[]>([]);
  const [editSubCategoryInput, setEditSubCategoryInput] = useState("");

  // Create
  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newMainCategory.trim()) {
      setError("Main category is required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainCategory: newMainCategory.trim(),
          subCategories: newSubCategories,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }

      setSuccess("Category created!");
      setNewMainCategory("");
      setNewSubCategories([]);
      setNewSubCategoryInput("");
      await refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Delete
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }
      await refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Enter edit mode
  const startEditing = (cat: Category) => {
    setEditCategoryId(cat._id);
    setEditSubCategories(cat.subCategories);
    setEditSubCategoryInput("");
    setError("");
    setSuccess("");
  };

  const cancelEditing = () => {
    setEditCategoryId("");
    setEditSubCategories([]);
    setEditSubCategoryInput("");
  };

  // Save updates
  const handleUpdateSubCategories = async () => {
    if (!editCategoryId) return;
    if (editSubCategories.length === 0) {
      toast.warning("Enter at least one subcategory or cancel.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/categories/${editCategoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subCategories: editSubCategories }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }
      setSuccess("Subcategories updated!");
      cancelEditing();
      await refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  // Helpers for tag inputs
  const addNewTag = (tag: string) => {
    if (tag && !newSubCategories.includes(tag)) {
      setNewSubCategories((prev) => [...prev, tag]);
    }
  };
  const addEditTag = (tag: string) => {
    if (tag && !editSubCategories.includes(tag)) {
      setEditSubCategories((prev) => [...prev, tag]);
    }
  };

  const handleNewKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addNewTag(newSubCategoryInput.trim());
      setNewSubCategoryInput("");
    }
  };
  const handleNewBlur = () => {
    addNewTag(newSubCategoryInput.trim());
    setNewSubCategoryInput("");
  };
  const removeNewTag = (tag: string) =>
    setNewSubCategories((prev) => prev.filter((t) => t !== tag));

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEditTag(editSubCategoryInput.trim());
      setEditSubCategoryInput("");
    }
  };
  const handleEditBlur = () => {
    addEditTag(editSubCategoryInput.trim());
    setEditSubCategoryInput("");
  };
  const removeEditTag = (tag: string) =>
    setEditSubCategories((prev) => prev.filter((t) => t !== tag));

  return (
    <div className='max-w-3xl mx-auto bg-[#181924]/90 border border-white/10 backdrop-blur-lg p-7 rounded-2xl shadow-2xl'>
      <h2 className='text-2xl font-bold mb-4 text-center text-white tracking-tight'>
        Manage Categories
      </h2>
      {error && <div className='text-red-400 mb-4'>{error}</div>}
      {success && <div className='text-green-400 mb-4'>{success}</div>}

      {/* Create New */}
      <form onSubmit={handleCreateCategory} className='mb-8'>
        <div className='mb-4'>
          <label className='block mb-1 font-medium text-cyan-300'>
            Main Category
          </label>
          <input
            type='text'
            value={newMainCategory}
            onChange={(e) => setNewMainCategory(e.target.value)}
            required
            className='w-full bg-white/10 border border-cyan-400/20 rounded px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 transition placeholder-gray-400'
            placeholder='e.g. Graphic Design'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1 font-medium text-cyan-300'>
            Sub Categories
          </label>
          <div className='flex flex-wrap gap-2 bg-white/5 border border-cyan-400/10 rounded p-2'>
            {newSubCategories.map((tag) => (
              <div
                key={tag}
                className='flex items-center bg-cyan-900/50 text-cyan-200 px-2 py-1 rounded-xl'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => removeNewTag(tag)}
                  className='ml-1 text-red-300 hover:text-red-500 font-bold'
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type='text'
              value={newSubCategoryInput}
              onChange={(e) => setNewSubCategoryInput(e.target.value)}
              onKeyDown={handleNewKeyDown}
              onBlur={handleNewBlur}
              className='flex-grow min-w-[120px] bg-transparent outline-none text-white placeholder-gray-400'
              placeholder='Press Enter or comma to add'
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition'
        >
          Create Category
        </button>
      </form>

      {/* Existing */}
      {loading ? (
        <p className='text-center text-cyan-200'>Loading…</p>
      ) : categories.length === 0 ? (
        <p className='text-center text-cyan-400'>No categories found.</p>
      ) : (
        categories.map((cat) => (
          <div
            key={cat._id}
            className='mb-7 flex flex-col md:flex-row md:justify-between md:items-center bg-white/5 border border-cyan-400/10 rounded-xl p-5 shadow-inner'
          >
            <div className='mb-3 md:mb-0'>
              <span className='font-semibold text-xl text-cyan-200'>
                {cat.mainCategory}
              </span>

              {editCategoryId === cat._id ? (
                <div className='mt-2 flex flex-wrap gap-2 border border-cyan-400/20 bg-black/20 rounded p-2'>
                  {editSubCategories.map((tag) => (
                    <div
                      key={tag}
                      className='flex items-center bg-cyan-900/50 text-cyan-200 px-2 py-1 rounded-xl'
                    >
                      {tag}
                      <button
                        type='button'
                        onClick={() => removeEditTag(tag)}
                        className='ml-1 text-red-300 hover:text-red-500 font-bold'
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type='text'
                    value={editSubCategoryInput}
                    onChange={(e) => setEditSubCategoryInput(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    onBlur={handleEditBlur}
                    className='flex-grow min-w-[120px] bg-transparent outline-none text-white placeholder-gray-400'
                    placeholder='Press Enter or comma to add'
                  />
                </div>
              ) : (
                <p className='text-cyan-300 mt-1'>
                  <span className='opacity-80'>Subcategories:</span>{" "}
                  {cat.subCategories.length ? (
                    cat.subCategories.join(", ")
                  ) : (
                    <span className='italic text-cyan-700'>None</span>
                  )}
                </p>
              )}
            </div>

            <div className='flex gap-2'>
              {editCategoryId === cat._id ? (
                <>
                  <button
                    onClick={handleUpdateSubCategories}
                    className='bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-medium'
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded font-medium'
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(cat)}
                    className='bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1 rounded font-medium'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className='bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-medium'
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCategories;
