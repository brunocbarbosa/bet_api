import { ContestNotFoundError } from '@/use-cases/errors/contest-not-found-error'
import { makeGetContestUseCase } from '@/use-cases/factories/make-get-contest-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOne(req: FastifyRequest, rep: FastifyReply) {
  const getContestSchema = z.object({
    contestNumber: z.coerce.number(),
  })

  const { contestNumber } = getContestSchema.parse(req.query)

  try {
    const getContestUseCase = makeGetContestUseCase()

    const contest = await getContestUseCase.execute({
      contestNumber,
    })

    return rep.status(200).send({ contest })
  } catch (error) {
    if (error instanceof ContestNotFoundError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
