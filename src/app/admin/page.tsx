"use client";

import React, { useEffect, useState, useCallback, ChangeEvent, FormEvent } from "react";
import AdminNavigation from "./AdminNavigation";
import AdminUploadForm from "./AdminUploadForm";
import AdminList from "./AdminList";
import AdminCategories from "./AdminCategories";
import AdminReviewForm from "./AdminReviewForm";
import ReviewManager from "./ReviewManager";
import AdminNewsletterList from "./AdminNewsletterList";
import { toast } from 'react-toastify';

const API_URL = "https://grafixr-backend.vercel.app";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!;

// --------------- AUTH GUARD ---------------
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
  // console.log('Input email:', email);
  // console.log('Input pw:', pw);
  // console.log('ADMIN_EMAIL:', ADMIN_EMAIL);
  // console.log('ADMIN_PASSWORD:', ADMIN_PASSWORD);
    if (email === ADMIN_EMAIL && pw === ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "1");
      onSuccess();
      toast.success("Logged in as admin!");
    } else {
      setError("Invalid admin credentials");
      toast.error("Invalid credentials");
    }
  }

  useEffect(() => { setError(""); }, [email, pw]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#191924] via-[#23232b] to-[#18181b]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#191924]/80 p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md flex flex-col gap-5 backdrop-blur"
      >
        <h1 className="text-2xl text-center font-bold text-cyan-300 tracking-tight mb-2">
          Admin Login
        </h1>
        <input
          type="email"
          placeholder="Admin email"
          autoComplete="username"
          className="rounded-lg border border-cyan-400/40 bg-black/60 px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-pink-400 shadow-inner"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            className="rounded-lg border border-cyan-400/40 bg-black/60 px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-pink-400 shadow-inner w-full"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-300 text-sm"
            onClick={() => setShowPw(p => !p)}
            tabIndex={-1}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-cyan-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-cyan-700 transition mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

// ---------- MAIN ADMIN PAGE ----------
interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  mediaType: "image" | "video";
  files: string[];
  createdAt: string;
}
interface Category {
  _id: string;
  mainCategory: string;
  subCategories: string[];
  createdAt: string;
}

export default function AdminPage() {
  // --- AUTH STATE
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin-auth") === "1") {
      setIsAuthed(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("admin-auth");
    setIsAuthed(false);
    toast.info("Logged out");
  }

  // --- Main app state (your code, unchanged)
  const [activeTab, setActiveTab] = useState<"upload" | "list" | "categories" | "reviews" | "reviewManager" | "newsletter">("upload");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string[]>>({});
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/categories`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Category[] = await res.json();
      setCategories(data);

      // Build map
      const map: Record<string, string[]> = {};
      data.forEach((c) => (map[c.mainCategory] = c.subCategories));
      setCategoriesMap(map);

      // Set defaults if missing
      if (data.length) {
        if (!map[mainCategory]) {
          const first = data[0].mainCategory;
          setMainCategory(first);
          setSubCategory(map[first][0] || "");
        } else if (!map[mainCategory].includes(subCategory)) {
          setSubCategory(map[mainCategory][0] || "");
        }
      }
    } catch (e) {
      toast.error("Failed loading categories");
      console.error("Failed loading categories", e);
    } finally {
      setCategoriesLoading(false);
    }
  }, [mainCategory, subCategory]);

  // Fetch items
  const fetchItems = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/list`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setItems(await res.json());
    } catch (e) {
      toast.error("Failed loading portfolio items");
      console.error("Failed loading items", e);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) {
      fetchCategories();
      fetchItems();
    }
    // Only refetch when authed
    // eslint-disable-next-line
  }, [isAuthed]);

  // File input + preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(e.target.files);
    if (mediaType === "image") {
      setPreviewUrls(Array.from(e.target.files).map((f) => URL.createObjectURL(f)));
    } else {
      setPreviewUrls([URL.createObjectURL(e.target.files[0])]);
    }
  };

  // Upload submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setUploadError("Please select at least one file.");
      return;
    }
    setUploadError("");
    setUploadSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("mainCategory", mainCategory);
      formData.append("subCategory", subCategory);
      formData.append("mediaType", mediaType);
      Array.from(files).forEach((f) => formData.append("files", f));

      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed");

      setUploadSuccess("Uploaded successfully!");
      setTitle("");
      setDescription("");
      setMediaType("image");
      setFiles(null);
      setPreviewUrls([]);

      // Reset selects to first category
      const mains = Object.keys(categoriesMap);
      if (mains.length) {
        setMainCategory(mains[0]);
        setSubCategory(categoriesMap[mains[0]][0] || "");
      }

      await fetchItems();
      toast.success("Portfolio item uploaded!");
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Unknown error");
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setUploading(false);
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Error ${res.status}`);
      }
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Item deleted!");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Unknown");
    }
  };

  // Layout styles
  const cardClass = "rounded-2xl bg-[#191924]/70 shadow-2xl border border-white/10 backdrop-blur-md px-6 py-7 mb-7 max-w-3xl mx-auto transition-colors";
  const sectionTitle = "text-2xl font-extrabold mb-1 tracking-tight text-white";
  const sectionSubtitle = "text-gray-400 mb-4";

  // ---------- GUARD: LOGIN IF NOT AUTHED ----------
  if (!isAuthed) {
    return <AdminLogin onSuccess={() => setIsAuthed(true)} />;
  }

  // ---------- ADMIN DASHBOARD ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#18181b] via-[#23232b] to-[#18181b] px-2 md:px-6 py-10 md:pt-24 max-w-7xl mx-auto relative rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
      <div className="sticky top-3 z-40 mb-8 flex justify-between items-center">
        <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <button
          onClick={handleLogout}
          className="ml-2 px-4 py-1.5 text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold shadow transition"
        >
          Logout
        </button>
      </div>

      <div>
        {activeTab === "upload" && (
          <div className={cardClass}>
            <div className={sectionTitle}>Upload New Portfolio Item</div>
            <div className={sectionSubtitle}>Add new work with category, images, or video.</div>
            <AdminUploadForm
              title={title}
              description={description}
              mainCategory={mainCategory}
              subCategory={subCategory}
              mediaType={mediaType}
              previewUrls={previewUrls}
              loading={uploading}
              error={uploadError}
              success={uploadSuccess}
              categoriesMap={categoriesMap}
              handleTitleChange={setTitle}
              handleDescriptionChange={setDescription}
              handleMainCategoryChange={setMainCategory}
              handleSubCategoryChange={setSubCategory}
              handleMediaTypeChange={setMediaType}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
            />
          </div>
        )}

        {activeTab === "list" && (
          <div className={cardClass}>
            <div className={sectionTitle}>Portfolio Items</div>
            <div className={sectionSubtitle}>View, filter, and manage your uploaded work.</div>
            <AdminList items={items} loading={listLoading} onDelete={handleDelete} />
          </div>
        )}

        {activeTab === "categories" && (
          <div className={cardClass}>
            <div className={sectionTitle}>Manage Categories</div>
            <div className={sectionSubtitle}>Add, edit, or delete main and sub categories.</div>
            <AdminCategories
              categories={categories}
              loading={categoriesLoading}
              refresh={fetchCategories}
              API_URL={API_URL}
            />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className={cardClass}>
            <div className={sectionTitle}>Add Portfolio Review</div>
            <div className={sectionSubtitle}>Manually add reviews/ratings for your portfolio.</div>
            <AdminReviewForm />
          </div>
        )}

        {activeTab === "reviewManager" && (
          <div className={cardClass}>
            <div className={sectionTitle}>Manage All Reviews</div>
            <div className={sectionSubtitle}>Review, approve, or delete client feedback.</div>
            <ReviewManager />
          </div>
        )}

        {activeTab === "newsletter" && (
          <div className={cardClass}>
            <div className={sectionTitle}>Newsletter Subscribers</div>
            <div className={sectionSubtitle}>All users who subscribed to your newsletter.</div>
            <AdminNewsletterList API_URL={API_URL} />
          </div>
        )}
      </div>
    </div>
  );
}
