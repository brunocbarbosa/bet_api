import { Contest, Prisma } from '@prisma/client'
import { ContestRepository } from '../contest-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryContestsRepository implements ContestRepository {
  public items: Contest[] = []

  async create(data: Prisma.ContestCreateInput) {
    const contest = {
      id: randomUUID(),
      number: data.number,
      name: data.name,
      prize: data.prize,
      raffle_date: new Date(data.raffle_date),
      created_at: new Date(),
    }

    this.items.push(contest)

    return contest
  }
}
