export class TicketLessThanMinumumError extends Error {
  constructor() {
    super('Ticket number less than minimum!!')
  }
}
