'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Fisherman = {
  id: string
  name: string
  bestCatches: string
  commonCatches: string
  votes: number
}

export default function VotingSection() {
  const [fishermen, setFishermen] = useState<Fisherman[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch initial data from our new API
 useEffect(() => {
    fetch('/api/fishermen')
      .then(res => res.json())
      .then(data => {
        // Validación para evitar que la página explote si la base de datos falla
        if (Array.isArray(data)) {
          setFishermen(data)
        } else {
          console.error("Error en la DB:", data)
          setFishermen([]) 
        }
        setLoading(false)
      })
  }, [])

  const handleVote = async (id: string) => {
    // 1. Dynamic UI & DOM Updates: Real-time array manipulation WITHOUT page reload
    const updatedFishermen = fishermen.map(f => 
      f.id === id ? { ...f, votes: f.votes + 1 } : f
    )
    
    // Sort array dynamically by votes
    updatedFishermen.sort((a, b) => b.votes - a.votes)
    
    // Update DOM instantly (Optimistic UI update)
    setFishermen(updatedFishermen)

    // Send data to backend API in the background
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Loading Top Fishermen...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fishermen.length === 0 ? (
        <div className="col-span-full bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
          <p className="text-gray-500">No fishermen added yet. Use the Admin Control to add data.</p>
        </div>
      ) : null}
      
      {fishermen.map((fisherman, index) => (
        <div key={fisherman.id} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-secondary transition duration-300">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition">
              {fisherman.name}
            </h3>
            <div className="text-right">
              <span className="text-3xl font-black text-brand-primary">#{index + 1}</span>
              <p className="text-xs font-bold text-gray-500 mt-1 bg-gray-100 rounded-full px-2 py-1 inline-block">
                {fisherman.votes} Votes
              </p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600"><strong className="text-gray-800">Best Catch:</strong> {fisherman.bestCatches}</p>
            <p className="text-sm text-gray-600 truncate"><strong className="text-gray-800">Common:</strong> {fisherman.commonCatches}</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => handleVote(fisherman.id)}
              className="flex-1 bg-brand-secondary hover:bg-blue-600 text-white font-bold py-2 rounded-lg shadow-sm transition active:scale-95"
            >
              👍 Vote
            </button>
            <Link 
              href={`/fisherman/${fisherman.id}`}
              className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded-lg transition"
            >
              Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
