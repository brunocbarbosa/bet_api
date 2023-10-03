import { ContestRepository } from '@/repositories/contest-repository'
import { Contest } from '@prisma/client'

interface registerContestRequest {
  id: string
  number: number
  name: string
  prize: number
  raffle_date: Date
}

interface registerContestResponse {
  contest: Contest
}

export class RegisterContestUseCase {
  constructor(private contestRepository: ContestRepository) {}

  async execute({
    name,
    number,
    prize,
    raffle_date,
  }: registerContestRequest): Promise<registerContestResponse> {
    const contest = await this.contestRepository.create({
      name,
      number,
      prize,
      raffle_date,
    })

    return {
      contest,
    }
  }
}
