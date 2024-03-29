import { FastifyInstance } from 'fastify'
import { register } from './register'
import { check } from './check'

export async function ticketRoutes(app: FastifyInstance) {
  app.post('/tickets', register)
  app.get('/tickets/check/:ticketId/:contestId', check)
}
