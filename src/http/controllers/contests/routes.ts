import { FastifyInstance } from 'fastify'
import { register } from './register'
import { draw } from './draw'
import { getOne } from './get-one'

export async function contestsRoutes(app: FastifyInstance) {
  app.post('/contests', register)
  app.get('/contests/one', getOne)
  app.get('/contests/:contestId', draw)
}
