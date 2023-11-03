import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createContest } from '@/utils/test/create-contest'

describe('register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const contest = await createContest()
    const bets: number[] = [1, 2, 3, 4, 5, 6]

    const res = await request(app.server).post('/tickets').send({
      city: 'Pouso Alegre',
      contest_number: contest.number,
      contestId: contest.id,
      bets,
    })

    expect(res.statusCode).toEqual(201)
  })
})
