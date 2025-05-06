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
      <h2 className="text-2xl font-bold mb-6">Manage Client Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review._id} className="border p-4 rounded shadow">
            {editingId === review._id && editingForm ? (
              <div className="space-y-2">
                <input
                  className="w-full border p-2"
                  value={editingForm.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                />
                <input
                  className="w-full border p-2"
                  value={editingForm.photo}
                  onChange={(e) => handleEditChange('photo', e.target.value)}
                />
                <textarea
                  className="w-full border p-2"
                  value={editingForm.text}
                  onChange={(e) => handleEditChange('text', e.target.value)}
                />
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="w-full border p-2"
                  value={editingForm.rating}
                  onChange={(e) => handleEditChange('rating', +e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSave}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-sm text-gray-600 underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-sm text-gray-700">{review.text}</p>
                  <p className="text-yellow-500">Rating: {review.rating}/5</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(review)}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 underline"
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
