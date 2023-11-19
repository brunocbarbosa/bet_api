import { ContestRepository } from '@/repositories/contest-repository'
import { ContestNotFoundError } from './errors/contest-not-found-error'
import { ContestWrongDateError } from './errors/contest-wrong-raffle-date-error'

interface getContestRequest {
  contestId: string
}

interface getContestResponse {
  drawNumbers: number[]
}

export class DrawContestUseCase {
  constructor(private contestRepository: ContestRepository) {}

  async execute({ contestId }: getContestRequest): Promise<getContestResponse> {
    const contest = await this.contestRepository.findById(contestId)

    if (!contest) throw new ContestNotFoundError()

    const date = new Date()
    const dataHoraBrasil = date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })

    const raffleDate = contest.raffle_date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })

    if (raffleDate !== dataHoraBrasil) throw new ContestWrongDateError()

    const drawNumbers: number[] = []

    for (let i = 0; i < contest.min_number; i++) {
      const min = 1
      const max = contest.max_number + contest.min_number

      let drawNumber = Math.floor(Math.random() * (max - min + 1)) + 1

      if (drawNumbers.length > 0) {
        drawNumbers.forEach((item) => {
          while (drawNumber === item) {
            drawNumber = Math.floor(Math.random() * (max - min + 1)) + 1
          }
        })
      }

      drawNumbers.push(drawNumber)
    }

    drawNumbers.sort((a, b) => a - b)

    const updatedContest = await this.contestRepository.updateDrawNumbers(
      contest.id,
      drawNumbers.toString(),
    )

    return {
      drawNumbers,
    }
  }
}
