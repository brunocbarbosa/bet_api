import { ContestRepository } from '@/repositories/contest-repository'
import { Contest } from '@prisma/client'
import { ContestNumberAlreadyExistsError } from './errors/contest-number-already-exists-error'

interface registerContestRequest {
  number: number
  min_number: number
  max_number: number
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
    min_number,
    max_number,
    prize,
    raffle_date,
  }: registerContestRequest): Promise<registerContestResponse> {
    const contestWithSameEmail =
      await this.contestRepository.findByContestNumber(number)

    if (contestWithSameEmail) throw new ContestNumberAlreadyExistsError()

    const contest = await this.contestRepository.create({
      name,
      number,
      min_number,
      max_number,
      prize,
      raffle_date,
    })

    return {
      contest,
    }
  }
}
