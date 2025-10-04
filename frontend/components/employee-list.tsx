'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { EmployeeForm } from './employee-form'
import { useEmployees, useDeleteEmployee } from '../hooks/use-employees'
import type { Employee } from '../lib/types'

import { Edit, Trash2, Mail, Search, Users } from 'lucide-react'

interface EmployeeListProps {
  searchQuery: string
}

export function EmployeeList({ searchQuery }: EmployeeListProps) {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null
  )
  const { data: employees = [], isLoading, error } = useEmployees(searchQuery)
  const deleteEmployee = useDeleteEmployee()

  const handleDeleteClick = (employee: Employee) => {
    setDeletingEmployee(employee)
  }

  const handleDeleteConfirm = () => {
    if (deletingEmployee) {
      deleteEmployee.mutate(deletingEmployee.id)
      setDeletingEmployee(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-2">Failed to load employees</div>
        <p className="text-gray-600">Please refresh the page</p>
      </div>
    )
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        {searchQuery ? (
          <>
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No employees found
            </h3>
            <p className="text-gray-600">
              No employees match &quot;{searchQuery}&quot;
            </p>
          </>
        ) : (
          <>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No employees yet
            </h3>
            <p className="text-gray-600">
              Get started by adding your first employee
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/40 p-4 sm:p-6 hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-purple-50/70 hover:border-blue-300/50 transition-all duration-300 relative"
          >
            <div className="flex items-start space-x-4 mb-6">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${
                  [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-pink-500',
                    'from-green-500 to-emerald-500',
                    'from-orange-500 to-red-500',
                    'from-indigo-500 to-purple-500',
                    'from-teal-500 to-blue-500',
                  ][employee.id % 6]
                } rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <span className="text-white font-bold text-lg">
                  {employee.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-1 truncate">
                  {employee.name}
                </h3>
                <p className="text-xs font-semibold text-gray-600 mb-2 truncate">
                  {employee.position}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{employee.email}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingEmployee(employee)}
                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(employee)}
                disabled={deleteEmployee.isPending}
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>

            {deletingEmployee?.id === employee.id && (
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-6 z-10 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-2">Delete Employee</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete {deletingEmployee.name}?
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDeletingEmployee(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteConfirm}
                    disabled={deleteEmployee.isPending}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog
        open={!!editingEmployee}
        onOpenChange={() => setEditingEmployee(null)}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {editingEmployee && (
            <EmployeeForm
              employee={editingEmployee}
              onSuccess={() => setEditingEmployee(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
