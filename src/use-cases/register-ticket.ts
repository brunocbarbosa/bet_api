import { ContestRepository } from '@/repositories/contest-repository'
import { TicketRepository } from '@/repositories/ticket-repository'
import { Bet, Ticket } from '@prisma/client'
import { ContestNotFoundError } from './errors/contest-not-found-error'

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
