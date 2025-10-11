import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/database.js'
import { EmployeeSchema, UpdateEmployeeSchema } from '../types/index.js'

export async function employeeRoutes(fastify: FastifyInstance) {
  // GET /api/employees
  fastify.get('/employees', async (request) => {
    const { search } = request.query as { search?: string }

    const where = search?.trim()
      ? {
          OR: [
            { name: { contains: search.trim() } },
            { email: { contains: search.trim() } },
            { position: { contains: search.trim() } },
          ],
        }
      : {}

    const employees = await prisma.employee.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return { employees }
  })

  // GET /api/employees/:id
  fastify.get('/employees/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    })

    if (!employee) {
      return reply.status(404).send({ error: 'Employee not found' })
    }

    return { employee }
  })

  // POST /api/employees
  fastify.post('/employees', async (request, reply) => {
    try {
      const data = EmployeeSchema.parse(request.body)
      const employee = await prisma.employee.create({ data })
      return reply.status(201).send({ employee })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Validation failed',
          details: error.errors,
        })
      }
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        return reply.status(409).send({ error: 'Email already exists' })
      }
      throw error
    }
  })

  // PUT /api/employees/:id
  fastify.put('/employees/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const data = UpdateEmployeeSchema.parse(request.body)
      const employee = await prisma.employee.update({
        where: { id: parseInt(id) },
        data,
      })
      return { employee }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Validation failed',
          details: error.errors,
        })
      }
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        return reply.status(404).send({ error: 'Employee not found' })
      }
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        return reply.status(409).send({ error: 'Email already exists' })
      }
      throw error
    }
  })

  // DELETE /api/employees/:id
  fastify.delete('/employees/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      await prisma.employee.delete({ where: { id: parseInt(id) } })
      return reply.status(204).send()
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        return reply.status(404).send({ error: 'Employee not found' })
      }
      throw error
    }
  })
}
