export class TicketGreaterThanMaximumError extends Error {
  constructor() {
    super('Ticket number greater than maximum!!')
  }
}
