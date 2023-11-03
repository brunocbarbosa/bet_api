import { prisma } from '@/lib/prisma'

export async function createContest() {
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
