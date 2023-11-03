import { Prisma } from '@prisma/client'
import { TicketRepository } from '../ticket-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTicketRepository implements TicketRepository {
  async findById(id: string) {
    return prisma.ticket.findUnique({
      where: {
        id,
      },
    })
  }

  async findBetsById(id: string) {
    return null
  }

  async create(data: Prisma.TicketUncheckedCreateInput, bets: number[]) {
    const ticket = await prisma.ticket.create({
      data,
    })

    bets.forEach((item) => {
      const data: Prisma.BetUncheckedCreateInput = {
        bet_number: item,
        ticket_id: ticket.id,
      }

      prisma.bet.create({
        data,
      })
    })

    return ticket
  }
}
