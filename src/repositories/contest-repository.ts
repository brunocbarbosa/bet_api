import { Prisma, Contest } from '@prisma/client'

export interface ContestRepository {
  findById(id: string): Promise<Contest | null>
  findByContestNumber(contestNumber: number): Promise<Contest | null>
  updateDrawNumbers(id: string, drawNumbers: string): Promise<Contest | null>
  create(data: Prisma.ContestCreateInput): Promise<Contest>
}
