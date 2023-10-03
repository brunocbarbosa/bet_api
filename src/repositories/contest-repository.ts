import { Prisma, Contest } from '@prisma/client'

export interface ContestRepository {
  findByContestNumber(contestNumber: number): Promise<Contest | null>
  create(data: Prisma.ContestCreateInput): Promise<Contest>
}
