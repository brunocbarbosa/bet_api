import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'

import { contestsRoutes } from './http/controllers/contests/routes'
import { ticketRoutes } from './http/controllers/ticket/router'

export const app = fastify()

app.register(contestsRoutes)
app.register(ticketRoutes)

app.setErrorHandler((error, _req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return rep.status(500).send({ message: 'Internal server error' })
})
