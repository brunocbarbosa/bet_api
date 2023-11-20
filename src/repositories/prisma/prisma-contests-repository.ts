import { Prisma } from '.prisma/client'
import { ContestRepository } from '../contest-repository'
import { prisma } from '@/lib/prisma'

export class PrismaContestsRepository implements ContestRepository {
  async findById(id: string) {
    return prisma.contest.findUnique({
      where: {
        id,
      },
    })
  }

  async findByContestNumber(contestNumber: number) {
    return prisma.contest.findUnique({
      where: {
        number: contestNumber,
      },
    })
  }

  async updateDrawNumbers(id: string, drawNumbers: string) {
    return prisma.contest.update({
      where: {
        id,
      },
      data: {
        draw_numbers: drawNumbers,
      },
    })
  }

  async create(data: Prisma.ContestCreateInput) {
    return prisma.contest.create({
      data,
    })
  }
}
