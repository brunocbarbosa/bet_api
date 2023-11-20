import { ContestRepository } from '@/repositories/contest-repository'
import { Contest } from '@prisma/client'
import { ContestNotFoundError } from './errors/contest-not-found-error'

interface getContestRequest {
  contestNumber: number
}

interface getContestResponse {
  contest: Contest
}

export class GetContestUseCase {
  constructor(private contestRepository: ContestRepository) {}

  async execute({
    contestNumber,
  }: getContestRequest): Promise<getContestResponse> {
    const contest =
      await this.contestRepository.findByContestNumber(contestNumber)

    if (!contest) throw new ContestNotFoundError()

    return {
      contest,
    }
  }
}
