import { Prisma, Contest } from '@prisma/client'

export interface ContestRepository {
  create(data: Prisma.ContestCreateInput): Promise<Contest>
}
