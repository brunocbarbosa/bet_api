import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function contestsRoutes(app: FastifyInstance) {
  app.post('/contests', register)
}
