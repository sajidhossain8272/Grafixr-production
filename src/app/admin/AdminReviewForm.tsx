'use client'

import React, { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export default function AdminReviewForm() {
  const [form, setForm] = useState({
    name: '',
    photo: '',
    text: '',
    rating: 5,
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'rating' ? +value : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }

      setStatus('success')
      setForm({ name: '', photo: '', text: '', rating: 5 })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred')
      setStatus('error')
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Add a Client Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Client name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          name="photo"
          value={form.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="Feedback..."
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={form.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Add Review'}
        </button>
        {status === 'success' && <p className="text-green-600">Review added!</p>}
        {status === 'error' && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  )
}
