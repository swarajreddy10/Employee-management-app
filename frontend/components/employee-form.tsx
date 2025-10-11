'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useCreateEmployee, useUpdateEmployee } from '../hooks/use-employees'
import { EmployeeSchema } from '../lib/types'
import type { Employee, CreateEmployeeData } from '../lib/types'

interface EmployeeFormProps {
  employee?: Employee
  onSuccess?: () => void
}

export function EmployeeForm({ employee, onSuccess }: EmployeeFormProps) {
  const isEditing = !!employee
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEmployeeData>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: employee || undefined,
  })

  const onSubmit = async (data: CreateEmployeeData) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: employee.id, data })
      } else {
        await createMutation.mutateAsync(data)
        reset()
      }
      onSuccess?.()
    } catch {}
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Full Name</Label>
        <Input
          {...register('name')}
          placeholder="e.g., Arjun Sharma"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>Email Address</Label>
        <Input
          type="email"
          {...register('email')}
          placeholder="e.g., arjun@fintechflow.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label>Job Position</Label>
        <Input
          {...register('position')}
          placeholder="e.g., Senior Software Engineer"
          disabled={isLoading}
        />
        {errors.position && (
          <p className="text-sm text-red-600 mt-1">{errors.position.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading
          ? 'Saving...'
          : isEditing
            ? 'Update Employee'
            : 'Create Employee'}
      </Button>
    </form>
  )
}
