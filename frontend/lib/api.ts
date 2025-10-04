import axios from 'axios'
import type { Employee, CreateEmployeeData, UpdateEmployeeData } from './types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 5000,
})

export const employeeApi = {
  getAll: (search?: string) =>
    api.get<{ employees: Employee[] }>('/employees', {
      params: search && search.trim() ? { search: search.trim() } : {},
    }),

  getById: (id: number) => api.get<{ employee: Employee }>(`/employees/${id}`),

  create: (data: CreateEmployeeData) =>
    api.post<{ employee: Employee }>('/employees', data),

  update: (id: number, data: UpdateEmployeeData) =>
    api.put<{ employee: Employee }>(`/employees/${id}`, data),

  delete: (id: number) => api.delete(`/employees/${id}`),
}

export default api
