export class ContestNumberAlreadyExistsError extends Error {
  constructor() {
    super('Contest number already exists!!')
  }
}
