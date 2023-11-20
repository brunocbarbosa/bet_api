import { PrismaContestsRepository } from '@/repositories/prisma/prisma-contests-repository'
import { GetContestUseCase } from '../get-a-contest'

export function makeGetContestUseCase() {
  const prismaContestRepository = new PrismaContestsRepository()
  const useCase = new GetContestUseCase(prismaContestRepository)

  return useCase
}
