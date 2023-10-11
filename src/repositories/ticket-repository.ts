import { Bet, Prisma, Ticket } from '@prisma/client'

export interface TicketRepository {
  findById(id: string): Promise<Ticket | null>
  findBetsById(id: string): Promise<Bet[] | null>
  create(
    data: Prisma.TicketUncheckedCreateInput,
    bets: number[],
  ): Promise<Ticket>
}
