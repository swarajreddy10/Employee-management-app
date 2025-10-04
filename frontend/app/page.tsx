'use client'

import { useState } from 'react'
import { SearchBar } from '../components/search-bar'
import { EmployeeList } from '../components/employee-list'
import { EmployeeForm } from '../components/employee-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { useEmployees } from '../hooks/use-employees'
import { Users, Plus, Building2 } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { data: employees = [] } = useEmployees(searchQuery)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl relative z-10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-11 sm:h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Building2 className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">FinTechFlow</h1>
                <p className="text-blue-100 text-xs font-medium hidden sm:block">
                  Empowering Financial Innovation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                <span className="text-white font-medium text-xs sm:text-sm">
                  {employees.length}
                </span>
              </div>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-200 text-xs sm:text-sm"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Add Employee</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 relative z-10">
        {/* Search Section */}
        <div className="bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200/30 p-8 mb-8 hover:shadow-3xl transition-all duration-300">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Find Team Members
            </h2>
            <p className="text-gray-600 text-sm">
              Search across all employee records
            </p>
          </div>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Employee Directory */}
        <div className="bg-gradient-to-br from-white/90 to-indigo-50/80 backdrop-blur-md rounded-3xl shadow-2xl border border-indigo-200/30 p-8 hover:shadow-3xl transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Employee Directory
            </h2>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? `Showing ${employees.length} results for "${searchQuery}"`
                : `Managing ${employees.length} team members`}
            </p>
          </div>
          <EmployeeList searchQuery={searchQuery} />
        </div>
      </main>

      {/* Add Employee Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Add New Employee
            </DialogTitle>
          </DialogHeader>
          <EmployeeForm onSuccess={() => setShowCreateForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
