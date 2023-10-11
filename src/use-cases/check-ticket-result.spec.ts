import { InMemoryContestsRepository } from '@/repositories/in-memory/in-memory-contests-repository'
import { InMemoryTicketRepository } from '@/repositories/in-memory/in-memory-ticket-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckTicketResultUseCase } from './check-ticket-result'
import { DrawContestUseCase } from './draw-contest'
import { RegisterTicketUseCase } from './register-ticket'

let ticketRepository: InMemoryTicketRepository
let contestRepository: InMemoryContestsRepository
let registerTicketUseCase: RegisterTicketUseCase
let drawContestUseCase: DrawContestUseCase
let sut: CheckTicketResultUseCase

describe('Check ticket Use Case', () => {
  beforeEach(() => {
    ticketRepository = new InMemoryTicketRepository()
    contestRepository = new InMemoryContestsRepository()
    registerTicketUseCase = new RegisterTicketUseCase(
      ticketRepository,
      contestRepository,
    )
    drawContestUseCase = new DrawContestUseCase(contestRepository)
    sut = new CheckTicketResultUseCase(ticketRepository, contestRepository)

    contestRepository.items.push({
      id: 'cont-01',
      name: 'Mega Money',
      number: 2328,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      raffle_date: new Date(),
      created_at: new Date(),
    })
  })

  it('should be able to win', async () => {
    const { drawNumbers } = await drawContestUseCase.execute({
      contestId: 'cont-01',
    })

    const bets: number[] = drawNumbers
    const { ticket } = await registerTicketUseCase.execute({
      city: 'Pouso Alegre',
      contest_number: 2328,
      contestId: 'cont-01',
      bets,
    })

    const { hits, result } = await sut.execute({
      contestId: 'cont-01',
      ticketId: ticket.id,
      resultNumbers: drawNumbers,
    })

    console.log(drawNumbers)
    console.log(hits)
    console.log(result)

    expect(hits).toEqual(drawNumbers)
    expect(result).toEqual('Ticket awarded')
  })
})
