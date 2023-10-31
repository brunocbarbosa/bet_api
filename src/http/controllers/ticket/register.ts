import { ContestNotFoundError } from '@/use-cases/errors/contest-not-found-error'
import { TicketGreaterThanMaximumError } from '@/use-cases/errors/ticket-greater-than-maximum'
import { TicketLessThanMinumumError } from '@/use-cases/errors/ticket-less-than-minimum'
import { makeRegisterTicketUseCase } from '@/use-cases/factories/make-register-ticket-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerTicketSchema = z.object({
    city: z.string(),
    contest_number: z.number(),
    contestId: z.string(),
    bets: z.number().array(),
  })

  const { city, bets, contestId, contest_number } = registerTicketSchema.parse(
    req.body,
  )

  try {
    const registerTicketUseCase = makeRegisterTicketUseCase()

    await registerTicketUseCase.execute({
      city,
      contest_number,
      contestId,
      bets,
    })
  } catch (error) {
    if (error instanceof ContestNotFoundError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    if (error instanceof TicketLessThanMinumumError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    if (error instanceof TicketGreaterThanMaximumError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(201).send()
}
