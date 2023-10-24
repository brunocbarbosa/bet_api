export class TicketContestNumberDifferentError extends Error {
  constructor() {
    super('Ticket contest number should not be different!!')
  }
}
