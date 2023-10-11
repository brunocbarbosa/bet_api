import { Bet, Prisma, Ticket } from '@prisma/client'
import { TicketRepository } from '../ticket-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTicketRepository implements TicketRepository {
  public ticketItems: Ticket[] = []
  public betItems: Bet[] = []

  async findById(id: string) {
    const ticket = this.ticketItems.find((item) => item.id === id)

    if (!ticket) return null

    return ticket
  }

  async findBetsById(id: string) {
    const bets: Bet[] = []

    for (const bet of this.betItems) {
      if (bet.ticket_id === id) {
        bets.push(bet)
      }
    }

    if (bets.length === 0) return null

    return bets
  }

  async create(data: Prisma.TicketUncheckedCreateInput, bets: number[]) {
    const ticket = {
      id: randomUUID(),
      city: data.city,
      contest_number: data.contest_number,
      created_at: new Date(),
      contest_id: data.contest_id,
    }

    this.ticketItems.push(ticket)

    bets.forEach((item) => {
      const bet = {
        id: randomUUID(),
        bet_number: item,
        ticket_id: ticket.id,
      }

      this.betItems.push(bet)
    })

    return ticket
  }
}
