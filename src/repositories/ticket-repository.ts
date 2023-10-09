import { Prisma, Ticket } from '@prisma/client'

export interface TicketRepository {
  create(
    data: Prisma.TicketUncheckedCreateInput,
    bets: number[],
  ): Promise<Ticket>
}