import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import Fastify from 'fastify'
import { employeeRoutes } from '../routes/employees.js'
import { prisma } from '../lib/database.js'

describe('Employee API', () => {
  let app: any

  beforeAll(async () => {
    app = Fastify({ logger: false })
    await app.register(employeeRoutes, { prefix: '/api' })
    await app.ready()
  })

  beforeEach(async () => {
    await prisma.employee.deleteMany()
  })

  afterAll(async () => {
    await prisma.employee.deleteMany()
    await prisma.$disconnect()
    if (app) {
      await app.close()
    }
  })

  it('should create a new employee', async () => {
    const employee = {
      name: 'Test User',
      email: 'test@example.com',
      position: 'Test Engineer',
    }

    const response = await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: employee,
    })

    expect(response.statusCode).toBe(201)
    const data = JSON.parse(response.payload)
    expect(data.employee.name).toBe(employee.name)
    expect(data.employee.email).toBe(employee.email)
    expect(data.employee.position).toBe(employee.position)
  })

  it('should get all employees', async () => {
    // Create test employee first
    await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: 'Test Employee',
        email: 'test@example.com',
        position: 'Tester',
      },
    })

    const response = await app.inject({
      method: 'GET',
      url: '/api/employees',
    })

    expect(response.statusCode).toBe(200)
    const data = JSON.parse(response.payload)
    expect(Array.isArray(data.employees)).toBe(true)
    expect(data.employees).toHaveLength(1)
  })

  it('should search employees', async () => {
    await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
        position: 'Developer',
      },
    })

    const response = await app.inject({
      method: 'GET',
      url: '/api/employees?search=John',
    })

    expect(response.statusCode).toBe(200)
    const data = JSON.parse(response.payload)
    expect(data.employees).toHaveLength(1)
    expect(data.employees[0].name).toBe('John Doe')
  })

  it('should update an employee', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: 'Update Test',
        email: 'update@example.com',
        position: 'Developer',
      },
    })

    const employee = JSON.parse(createResponse.payload).employee

    const updateResponse = await app.inject({
      method: 'PUT',
      url: `/api/employees/${employee.id}`,
      payload: {
        position: 'Senior Developer',
      },
    })

    expect(updateResponse.statusCode).toBe(200)
    const updatedEmployee = JSON.parse(updateResponse.payload).employee
    expect(updatedEmployee.position).toBe('Senior Developer')
  })

  it('should delete an employee', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: 'Delete Test',
        email: 'delete@example.com',
        position: 'Tester',
      },
    })

    const employee = JSON.parse(createResponse.payload).employee

    const deleteResponse = await app.inject({
      method: 'DELETE',
      url: `/api/employees/${employee.id}`,
    })

    expect(deleteResponse.statusCode).toBe(204)

    // Verify deletion
    const getResponse = await app.inject({
      method: 'GET',
      url: `/api/employees/${employee.id}`,
    })

    expect(getResponse.statusCode).toBe(404)
  })

  it('should validate required fields', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: '',
        email: 'invalid-email',
        position: '',
      },
    })

    expect(response.statusCode).toBe(400)
    const data = JSON.parse(response.payload)
    expect(data.error).toBe('Validation failed')
  })

  it('should handle duplicate email', async () => {
    await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: 'First User',
        email: 'duplicate@example.com',
        position: 'Developer',
      },
    })

    const response = await app.inject({
      method: 'POST',
      url: '/api/employees',
      payload: {
        name: 'Second User',
        email: 'duplicate@example.com',
        position: 'Designer',
      },
    })

    expect(response.statusCode).toBe(409)
    const data = JSON.parse(response.payload)
    expect(data.error).toBe('Email already exists')
  })
})
