import { InMemoryContestsRepository } from '@/repositories/in-memory/in-memory-contests-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DrawContestUseCase } from './draw-contest'
import { InMemoryTicketRepository } from '@/repositories/in-memory/in-memory-ticket-repository'
import { ContestWrongDateError } from './errors/contest-wrong-raffle-date-error'
import { ContestNotFoundError } from './errors/contest-not-found-error'

let contestRepository: InMemoryContestsRepository
let ticketRepository: InMemoryTicketRepository
let sut: DrawContestUseCase

describe('Draw Contest use Case', () => {
  beforeEach(() => {
    contestRepository = new InMemoryContestsRepository()
    ticketRepository = new InMemoryTicketRepository()
    sut = new DrawContestUseCase(contestRepository)

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

    contestRepository.items.push({
      id: 'cont-02',
      name: 'Mega Money',
      number: 2329,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      draw_numbers: 'null',
      raffle_date: new Date('2023-10-10T00:00:00.000Z'),
      created_at: new Date(),
    })
  })

  it('should be able to draw numbers', async () => {
    const { drawNumbers } = await sut.execute({
      contestId: 'cont-01',
    })

    expect(drawNumbers.length).toEqual(5)
  })

  it('should not be able to draw numbers in wrong date', async () => {
    await expect(() =>
      sut.execute({
        contestId: 'cont-02',
      }),
    ).rejects.toBeInstanceOf(ContestWrongDateError)
  })

  it('should not be able to draw numbers if does not exists contest', async () => {
    await expect(() =>
      sut.execute({
        contestId: 'cont-03',
      }),
    ).rejects.toBeInstanceOf(ContestNotFoundError)
  })
})
