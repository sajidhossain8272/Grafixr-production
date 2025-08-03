'use client'

import { useEffect, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL!

interface Review {
  _id: string
  name: string
  photo: string
  text: string
  rating: number
}

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingForm, setEditingForm] = useState<Omit<Review, '_id'> | null>(null)

  const fetchReviews = async () => {
    const res = await fetch(`${API_URL}/reviews`)
    const data = await res.json()
    setReviews(data)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleEditClick = (review: Review) => {
    setEditingId(review._id)
    setEditingForm({
      name: review.name,
      photo: review.photo,
      text: review.text,
      rating: review.rating,
    })
  }

  const handleEditChange = (field: keyof Review, value: string | number) => {
    if (editingForm) {
      setEditingForm({ ...editingForm, [field]: value })
    }
  }

  const handleEditSave = async () => {
    if (!editingId || !editingForm) return
    const res = await fetch(`${API_URL}/reviews/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingForm),
    })
    if (res.ok) {
      setEditingId(null)
      setEditingForm(null)
      fetchReviews()
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingForm(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return
    await fetch(`${API_URL}/reviews/${id}`, { method: 'DELETE' })
    fetchReviews()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-extrabold mb-6 text-white tracking-tight">Manage Client Reviews</h2>
      <ul className="space-y-5">
        {reviews.map((review) => (
          <li
            key={review._id}
            className="rounded-2xl bg-[#181924]/70 shadow-2xl border border-white/10 backdrop-blur-md px-6 py-5"
          >
            {editingId === review._id && editingForm ? (
              <div className="space-y-3">
                <input
                  className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-2 transition"
                  value={editingForm.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  placeholder="Name"
                />
                <input
                  className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-2 transition"
                  value={editingForm.photo}
                  onChange={(e) => handleEditChange('photo', e.target.value)}
                  placeholder="Photo URL"
                />
                <textarea
                  className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-2 transition"
                  value={editingForm.text}
                  onChange={(e) => handleEditChange('text', e.target.value)}
                  placeholder="Review text"
                  rows={3}
                />
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-2 transition"
                  value={editingForm.rating}
                  onChange={(e) => handleEditChange('rating', +e.target.value)}
                  placeholder="Rating (1-5)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSave}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-1.5 rounded-lg font-semibold transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-sm text-gray-400 underline px-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-sm text-gray-300 mt-1 mb-2">{review.text}</p>
                  <p className="text-yellow-500 font-semibold">Rating: {review.rating}/5</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[72px] items-end">
                  <button
                    onClick={() => handleEditClick(review)}
                    className="text-cyan-400 underline font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-400 underline font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
