import { app } from '@/app'
import { createContest } from '@/utils/test/create-contest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('draw (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to draw a contest', async () => {
    const contest = await createContest()

    const res = await request(app.server)
      .get(`/contests/${contest.id}`)
      .send({})

    expect(res.statusCode).toEqual(200)
  })
})
