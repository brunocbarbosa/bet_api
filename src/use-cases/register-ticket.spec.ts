import { InMemoryTicketRepository } from '@/repositories/in-memory/in-memory-ticket-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterTicketUseCase } from './register-ticket'
import { InMemoryContestsRepository } from '@/repositories/in-memory/in-memory-contests-repository'
import { ContestNotFoundError } from './errors/contest-not-found-error'
import { TicketLessThanMinumumError } from './errors/ticket-less-than-minimum'
import { TicketGreaterThanMaximumError } from './errors/ticket-greater-than-maximum'

let ticketRepository: InMemoryTicketRepository
let contestRepository: InMemoryContestsRepository
let sut: RegisterTicketUseCase

describe('Ticket Use Case', () => {
  beforeEach(() => {
    ticketRepository = new InMemoryTicketRepository()
    contestRepository = new InMemoryContestsRepository()
    sut = new RegisterTicketUseCase(ticketRepository, contestRepository)

    contestRepository.items.push({
      id: 'cont-01',
      name: 'Mega Money',
      number: 2328,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      draw_numbers: 'null',
      raffle_date: new Date('10/05/2023'),
      created_at: new Date(),
    })
  })

  it('should be able to create ticket', async () => {
    const bets: number[] = [1, 2, 3, 4, 5, 6]
    const { ticket } = await sut.execute({
      city: 'Pouso Alegre',
      contest_number: 2328,
      contestId: 'cont-01',
      bets,
    })

    expect(ticket.id).toEqual(expect.any(String))
  })

  it('should not be able to register without contest', async () => {
    const bets: number[] = [1, 2, 3, 4, 5, 6]
    await expect(() =>
      sut.execute({
        city: 'Pouso Alegre',
        contest_number: 2328,
        contestId: 'cont-02',
        bets,
      }),
    ).rejects.toBeInstanceOf(ContestNotFoundError)
  })

  it('should not be able to register if minimum bet number is less than minimum', async () => {
    const bets: number[] = [1, 2, 3, 4]
    await expect(() =>
      sut.execute({
        city: 'Pouso Alegre',
        contest_number: 2328,
        contestId: 'cont-01',
        bets,
      }),
    ).rejects.toBeInstanceOf(TicketLessThanMinumumError)
  })

  it('should not be able to register if maximum bet number is greater than maximum', async () => {
    const bets: number[] = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ]
    await expect(() =>
      sut.execute({
        city: 'Pouso Alegre',
        contest_number: 2328,
        contestId: 'cont-01',
        bets,
      }),
    ).rejects.toBeInstanceOf(TicketGreaterThanMaximumError)
  })
})
