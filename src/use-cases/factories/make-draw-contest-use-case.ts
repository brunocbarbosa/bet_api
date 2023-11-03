import { PrismaContestsRepository } from '@/repositories/prisma/prisma-contests-repository'
import { DrawContestUseCase } from '../draw-contest'

export function makeDrawContestUseCase() {
  const prismaContestRepository = new PrismaContestsRepository()
  const useCase = new DrawContestUseCase(prismaContestRepository)

  return useCase
}
