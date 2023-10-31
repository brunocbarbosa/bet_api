import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function ticketRoutes(app: FastifyInstance) {
  app.post('/tickets', register)
}
