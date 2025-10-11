// Suppress all Node.js warnings including deprecation warnings
process.removeAllListeners('warning')
process.on('warning', () => {})
process.env.NODE_NO_WARNINGS = '1'

import cors from '@fastify/cors'
import Fastify from 'fastify'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { prisma } from './lib/database.js'
import { employeeRoutes } from './routes/employees.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
  logger: false,
})

// Register CORS
fastify.register(cors, {
  origin: true,
  credentials: true,
})

// API-only server - no frontend serving

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Register routes
fastify.register(employeeRoutes, { prefix: '/api' })

// Global error handler
fastify.setErrorHandler((error: any, request: any, reply: any) => {
  // Log error for debugging
  console.error('Error:', error.message)

  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation Error',
      details: error.validation,
    })
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      error: error.message,
    })
  }

  return reply.status(500).send({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong'
        : error.message,
  })
})

// Graceful shutdown
const shutdown = async () => {
  await prisma.$disconnect()
  await fastify.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 8000
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`[API] ✅ Server running on port ${port}`)
  } catch (err) {
    console.error('[API] ❌ Backend failed to start:', err)
    process.exit(1)
  }
}

start()

export default fastify
