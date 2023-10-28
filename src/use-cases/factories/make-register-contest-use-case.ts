import { PrismaContestsRepository } from '@/repositories/prisma/prisma-contests-repository'
import { RegisterContestUseCase } from '../register-contest'

export function makeRegisterContestUseCase() {
  const prismaContestRepository = new PrismaContestsRepository()
  const useCase = new RegisterContestUseCase(prismaContestRepository)

  return useCase
}
