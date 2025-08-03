/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function AdminNewsletterList({ API_URL }: { API_URL: string }) {
  const [subs, setSubs] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/admin/newsletter`);
        if (!res.ok) throw new Error("Failed to load newsletter list");
        const data = await res.json();
        setSubs(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      }
      setLoading(false);
    };
    fetchSubs();
  }, [API_URL]);

  return (
    <div className="rounded-2xl bg-[#16171b] shadow-xl px-4 py-7 md:px-8 md:py-9 max-w-2xl mx-auto border border-white/10">
      <div className="text-2xl font-bold mb-2 text-cyan-300 tracking-tight">
        Newsletter Subscribers
      </div>
      <div className="mb-6 text-gray-400 text-sm">
        List of everyone subscribed to your newsletter.
      </div>
      {loading ? (
        <div className="py-10 text-center text-cyan-300 animate-pulse">Loading...</div>
      ) : error ? (
        <div className="py-10 text-center text-red-400">{error}</div>
      ) : !subs.length ? (
        <div className="py-10 text-center text-gray-500">No subscribers yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full bg-[#191a20] border border-white/10 rounded-xl shadow text-white">
            <thead>
              <tr className="bg-[#23232b] border-b border-white/10">
                <th className="px-4 py-3 font-medium text-cyan-200">Email</th>
                <th className="px-4 py-3 font-medium text-cyan-200">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <tr key={sub._id} className="border-b border-white/10 hover:bg-cyan-400/10 transition">
                  <td className="px-4 py-2 font-mono break-all">{sub.email}</td>
                  <td className="px-4 py-2 text-gray-400">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
