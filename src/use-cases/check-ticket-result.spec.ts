import { InMemoryContestsRepository } from '@/repositories/in-memory/in-memory-contests-repository'
import { InMemoryTicketRepository } from '@/repositories/in-memory/in-memory-ticket-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckTicketResultUseCase } from './check-ticket-result'
import { DrawContestUseCase } from './draw-contest'
import { RegisterTicketUseCase } from './register-ticket'
import { ContestNotFoundError } from './errors/contest-not-found-error'
import { TicketNotFoundError } from './errors/ticket-not-found-error'
import { TicketContestNumberDifferentError } from './errors/ticket-contest-number-different-error'

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
      draw_numbers: 'null',
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

    expect(hits).toEqual(drawNumbers)
    expect(result).toEqual('Ticket awarded')
  })

  it('should not be able check ticket without contest', async () => {
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

    await expect(() =>
      sut.execute({
        contestId: 'cont-02',
        ticketId: ticket.id,
        resultNumbers: drawNumbers,
      }),
    ).rejects.toBeInstanceOf(ContestNotFoundError)
  })

  it('should not be able check ticket without ticket', async () => {
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

    await expect(() =>
      sut.execute({
        contestId: 'cont-01',
        ticketId: `${ticket.id}1`,
        resultNumbers: drawNumbers,
      }),
    ).rejects.toBeInstanceOf(TicketNotFoundError)
  })

  it('should not be able check if ticket contest number is differents', async () => {
    const { drawNumbers } = await drawContestUseCase.execute({
      contestId: 'cont-01',
    })

    const bets: number[] = drawNumbers
    const { ticket } = await registerTicketUseCase.execute({
      city: 'Pouso Alegre',
      contest_number: 2329,
      contestId: 'cont-01',
      bets,
    })

    await expect(() =>
      sut.execute({
        contestId: 'cont-01',
        ticketId: ticket.id,
        resultNumbers: drawNumbers,
      }),
    ).rejects.toBeInstanceOf(TicketContestNumberDifferentError)
  })
})
