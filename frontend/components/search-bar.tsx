'use client'

import { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleChange = (value: string) => {
    setQuery(value)
  }

  const handleClear = () => handleChange('')

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search by name, email, or position..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-12 pr-12 h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
