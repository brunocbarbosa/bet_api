import { ContestRepository } from '@/repositories/contest-repository'
import { TicketRepository } from '@/repositories/ticket-repository'
import { Ticket } from '@prisma/client'
import { ContestNotFoundError } from './errors/contest-not-found-error'
import { TicketLessThanMinumumError } from './errors/ticket-less-than-minimum'
import { TicketGreaterThanMaximumError } from './errors/ticket-greater-than-maximum'

interface registerTicketRequest {
  city: string
  contestId: string
  bets: number[]
}

interface registerTicketResponse {
  ticket: Ticket
}

export class RegisterTicketUseCase {
  constructor(
    private ticketRepository: TicketRepository,
    private contestRepository: ContestRepository,
  ) {}

  async execute({
    city,
    contestId,
    bets,
  }: registerTicketRequest): Promise<registerTicketResponse> {
    const contest = await this.contestRepository.findById(contestId)

    if (!contest) throw new ContestNotFoundError()

    if (bets.length < contest.min_number) throw new TicketLessThanMinumumError()

    if (bets.length > contest.max_number)
      throw new TicketGreaterThanMaximumError()

    const ticket = await this.ticketRepository.create(
      {
        city,
        contest_id: contestId,
      },
      bets,
    )

    return {
      ticket,
    }
  }
}
