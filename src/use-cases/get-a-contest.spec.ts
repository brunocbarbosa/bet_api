import { InMemoryTicketRepository } from '@/repositories/in-memory/in-memory-ticket-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterTicketUseCase } from './register-ticket'
import { InMemoryContestsRepository } from '@/repositories/in-memory/in-memory-contests-repository'
import { ContestNotFoundError } from './errors/contest-not-found-error'
import { TicketLessThanMinumumError } from './errors/ticket-less-than-minimum'
import { TicketGreaterThanMaximumError } from './errors/ticket-greater-than-maximum'
import { GetContestUseCase } from './get-a-contest'

let contestRepository: InMemoryContestsRepository
let sut: GetContestUseCase

describe('Get a C00ontest Use Case', () => {
  beforeEach(() => {
    contestRepository = new InMemoryContestsRepository()
    sut = new GetContestUseCase(contestRepository)

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

  it('should be get a contest', async () => {
    const { contest } = await sut.execute({
      contestNumber: 2328,
    })

    expect(contest.id).toEqual(expect.any(String))
  })

  it('should not be able to get contest that dont exists', async () => {
    await expect(() =>
      sut.execute({
        contestNumber: 2327,
      }),
    ).rejects.toBeInstanceOf(ContestNotFoundError)
  })
})
