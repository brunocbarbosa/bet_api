import { ContestWrongDateError } from '@/use-cases/errors/contest-wrong-raffle-date-error'
import { makeDrawContestUseCase } from '@/use-cases/factories/make-draw-contest-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function draw(req: FastifyRequest, rep: FastifyReply) {
  const drawContestSchema = z.object({
    contestId: z.string().uuid(),
  })

  const { contestId } = drawContestSchema.parse(req.params)

  try {
    const drawContestUseCase = makeDrawContestUseCase()

    const { drawNumbers } = await drawContestUseCase.execute({ contestId })

    return rep.status(200).send({ drawNumbers })
  } catch (error) {
    if (error instanceof ContestWrongDateError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
