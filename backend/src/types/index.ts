import { z } from 'zod'

export const EmployeeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format').max(255, 'Email too long'),
  position: z
    .string()
    .min(1, 'Position is required')
    .max(100, 'Position too long'),
})

export const UpdateEmployeeSchema = EmployeeSchema.partial()

export type Employee = {
  id: number
  name: string
  email: string
  position: string
  createdAt: Date
  updatedAt: Date
}

export type CreateEmployeeData = z.infer<typeof EmployeeSchema>
export type UpdateEmployeeData = z.infer<typeof UpdateEmployeeSchema>
