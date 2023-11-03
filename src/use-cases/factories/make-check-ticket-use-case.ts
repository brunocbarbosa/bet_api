import { PrismaContestsRepository } from '@/repositories/prisma/prisma-contests-repository'
import { PrismaTicketRepository } from '@/repositories/prisma/prisma-ticket-repository'
import { CheckTicketResultUseCase } from '../check-ticket-result'

export function makeCheckTicketUseCase() {
  const prismaTicketRepository = new PrismaTicketRepository()
  const prismaContestRepository = new PrismaContestsRepository()
  const useCase = new CheckTicketResultUseCase(
    prismaTicketRepository,
    prismaContestRepository,
  )

  return useCase
}
