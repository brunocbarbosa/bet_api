import { TicketBetsNotFoundError } from '@/use-cases/errors/ticket-bets-not-found-error'
import { makeCheckTicketUseCase } from '@/use-cases/factories/make-check-ticket-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function check(req: FastifyRequest, rep: FastifyReply) {
  const checkTicketParamsSchema = z.object({
    ticketId: z.string().uuid(),
    contestId: z.string().uuid(),
  })

  const { ticketId, contestId } = checkTicketParamsSchema.parse(req.params)

  try {
    const checkTicketUseCase = makeCheckTicketUseCase()

    const { hits, result } = await checkTicketUseCase.execute({
      ticketId,
      contestId,
    })

    return rep.status(200).send({ hits, result })
  } catch (error) {
    if (error instanceof TicketBetsNotFoundError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
