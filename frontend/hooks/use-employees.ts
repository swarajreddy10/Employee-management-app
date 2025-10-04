import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { employeeApi } from '../lib/api'
import type { CreateEmployeeData, UpdateEmployeeData } from '../lib/types'
import { toast } from 'sonner'
import { useDebounce } from './use-debounce'

export function useEmployees(search?: string) {
  const debouncedSearch = useDebounce(search?.trim() || '', 300)

  return useQuery({
    queryKey: ['employees', debouncedSearch],
    queryFn: async () => {
      const response = await employeeApi.getAll(debouncedSearch)
      return response.data.employees
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEmployeeData) => employeeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create employee')
    },
  })
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeData }) =>
      employeeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update employee')
    },
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => employeeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Employee deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete employee')
    },
  })
}
