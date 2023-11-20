import { app } from '@/app'
import { createContest } from '@/utils/test/create-contest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('get one (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a contest by contest number', async () => {
    const contest = await createContest()

    const res = await request(app.server)
      .get(`/contests/one`)
      .query({ contestNumber: contest.number })

    expect(res.statusCode).toEqual(200)
  })
})
