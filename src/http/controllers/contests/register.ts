import { ContestNumberAlreadyExistsError } from '@/use-cases/errors/contest-number-already-exists-error'
import { makeRegisterContestUseCase } from '@/use-cases/factories/make-register-contest-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerContestSchema = z.object({
    number: z.number(),
    min_number: z.number(),
    max_number: z.number(),
    name: z.string(),
    prize: z.number(),
    raffle_date: z.date(),
  })

  const { number, min_number, max_number, name, prize, raffle_date } =
    registerContestSchema.parse(req.body)

  try {
    const registerContestUseCase = makeRegisterContestUseCase()

    await registerContestUseCase.execute({
      name,
      min_number,
      max_number,
      number,
      prize,
      raffle_date,
    })
  } catch (error) {
    if (error instanceof ContestNumberAlreadyExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(201).send()
}
