import { InMemoryContestsRepository } from '@/repositories/in-memory/in-memory-contests-repository'
import { RegisterContestUseCase } from './register-contest'
import { describe, beforeEach, it, expect } from 'vitest'
import { ContestNumberAlreadyExistsError } from './errors/contest-number-already-exists-error'

let contestRepository: InMemoryContestsRepository
let sut: RegisterContestUseCase

describe('Contest Use Case', () => {
  beforeEach(() => {
    contestRepository = new InMemoryContestsRepository()
    sut = new RegisterContestUseCase(contestRepository)
  })

  it('should be able to register', async () => {
    const { contest } = await sut.execute({
      name: 'Mega Money',
      number: 2328,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      raffle_date: new Date('10/05/2023'),
    })

    expect(contest.id).toEqual(expect.any(String))
  })

  it('should not be able to register with the same number', async () => {
    const number = 2328

    await sut.execute({
      name: 'Mega Money',
      number,
      min_number: 5,
      max_number: 15,
      prize: 1000000,
      raffle_date: new Date('10/05/2023'),
    })

    await expect(() =>
      sut.execute({
        name: 'Mega Money',
        number,
        min_number: 5,
        max_number: 15,
        prize: 1000000,
        raffle_date: new Date('10/05/2023'),
      }),
    ).rejects.toBeInstanceOf(ContestNumberAlreadyExistsError)
  })
})
