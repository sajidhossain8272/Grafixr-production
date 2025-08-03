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
    <div className="max-w-xl mx-auto my-8 rounded-2xl bg-[#181924]/70 border border-white/10 shadow-2xl backdrop-blur-lg px-7 py-8">
      <h2 className="text-2xl font-extrabold mb-4 text-white tracking-tight">
        Add a Client Review
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Client name"
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        />
        <input
          type="url"
          name="photo"
          value={form.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        />
        <textarea
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="Feedback..."
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          rows={3}
          required
        />
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={form.rating}
          onChange={handleChange}
          className="w-full bg-white/10 text-white border border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/40 focus:border-pink-400 rounded-lg p-3 transition"
          required
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Add Review'}
        </button>
        {status === 'success' && <p className="text-green-400 font-semibold">Review added!</p>}
        {status === 'error' && <p className="text-red-400 font-semibold">{error}</p>}
      </form>
    </div>
  )
}
