import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function createContest(app: FastifyInstance) {
  return prisma.contest.create({
    data: {
      name: 'Mega Money',
      number: 2328,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      raffle_date: new Date(),
    },
  })
}
