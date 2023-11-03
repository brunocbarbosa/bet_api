import { FastifyInstance } from 'fastify'
import { register } from './register'
import { draw } from './draw'

export async function contestsRoutes(app: FastifyInstance) {
  app.post('/contests', register)
  app.get('/contests/:contestId', draw)
}
