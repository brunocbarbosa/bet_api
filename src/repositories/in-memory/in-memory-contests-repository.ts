import { Contest, Prisma } from '@prisma/client'
import { ContestRepository } from '../contest-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryContestsRepository implements ContestRepository {
  public items: Contest[] = []

  async findById(id: string) {
    const contest = this.items.find((item) => item.id === id)

    if (!contest) return null

    return contest
  }

  async findByContestNumber(contestNumber: number) {
    const contest = this.items.find((item) => item.number === contestNumber)

    if (!contest) return null

    return contest
  }

  async create(data: Prisma.ContestCreateInput) {
    const contest = {
      id: randomUUID(),
      number: data.number,
      min_number: data.min_number,
      max_number: data.max_number,
      name: data.name,
      prize: data.prize,
      raffle_date: new Date(data.raffle_date),
      created_at: new Date(),
    }

    this.items.push(contest)

    return contest
  }
}
