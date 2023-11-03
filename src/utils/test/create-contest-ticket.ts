import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createContestTicket(app: FastifyInstance) {
  const contest = await prisma.contest.create({
    data: {
      name: 'Mega Money',
      number: 2328,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      raffle_date: new Date(),
    },
  })

  const ticket = await prisma.ticket.create({
    data: {
      city: 'Pouso Alegre',
      contest_number: contest.number,
      contest_id: contest.id,
      Bet: {
        createMany: {
          data: [
            { bet_number: 1 },
            { bet_number: 2 },
            { bet_number: 3 },
            { bet_number: 4 },
            { bet_number: 5 },
            { bet_number: 6 },
          ],
        },
      },
    },
  })

  return {
    contest,
    ticket,
  }
}
