import { ContestRepository } from '@/repositories/contest-repository'
import { TicketRepository } from '@/repositories/ticket-repository'
import { ContestNotFoundError } from './errors/contest-not-found-error'
import { TicketNotFoundError } from './errors/ticket-not-found-error'
import { TicketContestNumberDifferentError } from './errors/ticket-contest-number-different-error'
import { TicketBetsNotFoundError } from './errors/ticket-bets-not-found-error'

interface CheckTicketResultRequest {
  ticketId: string
  contestId: string
  resultNumbers: number[]
}

interface CheckTicketResultResponse {
  hits: number[]
  result: string
}

export class CheckTicketResultUseCase {
  constructor(
    private ticketRepository: TicketRepository,
    private contestRepository: ContestRepository,
  ) {}

  async execute({
    ticketId,
    contestId,
    resultNumbers,
  }: CheckTicketResultRequest): Promise<CheckTicketResultResponse> {
    const contest = await this.contestRepository.findById(contestId)
    const ticket = await this.ticketRepository.findById(ticketId)

    if (!contest) throw new ContestNotFoundError()
    if (!ticket) throw new TicketNotFoundError()
    if (contest.number !== ticket.contest_number)
      throw new TicketContestNumberDifferentError()

    const bets = await this.ticketRepository.findBetsById(ticketId)

    if (!bets) throw new TicketBetsNotFoundError()

    const hits: number[] = []

    resultNumbers.forEach((number) => {
      for (const bet of bets) {
        if (number === bet.bet_number) {
          hits.push(number)
        }
      }
    })

    let result = 'Ticket was not awarded'

    if (hits.length === resultNumbers.length) {
      result = 'Ticket awarded'
    }

    return {
      hits,
      result,
    }
  }
}
