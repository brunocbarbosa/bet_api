import { PrismaTicketRepository } from '@/repositories/prisma/prisma-ticket-repository'
import { RegisterTicketUseCase } from '../register-ticket'
import { PrismaContestsRepository } from '@/repositories/prisma/prisma-contests-repository'

export function makeRegisterTicketUseCase() {
  const prismaTicketRepository = new PrismaTicketRepository()
  const prismaContestRepository = new PrismaContestsRepository()
  const useCase = new RegisterTicketUseCase(
    prismaTicketRepository,
    prismaContestRepository,
  )

  return useCase
}
