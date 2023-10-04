import { Bet, Prisma, Ticket } from '@prisma/client'
import { TicketRepository } from '../ticket-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryTicketRepository implements TicketRepository {
  public ticketItems: Ticket[] = []
  public betItems: Bet[] = []

  async create(data: Prisma.TicketUncheckedCreateInput, bets: number[]) {
    const ticket = {
      id: randomUUID(),
      city: data.city,
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
