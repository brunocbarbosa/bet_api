import { app } from '@/app'
import { createContest } from '@/utils/test/create-contest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createContestTicket } from '@/utils/test/create-contest-ticket'

describe('check ticket (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to check a ticket result', async () => {
    const { contest, ticket } = await createContestTicket(app)

    const drawContestResultResponse = await request(app.server)
      .get(`/contests/${contest.id}`)
      .send({})

    const { drawNumbers } = drawContestResultResponse.body

    const res = await request(app.server)
      .post(`/tickets/check/${ticket.id}/${contest.id}`)
      .send({ drawNumbers })

    expect(res.statusCode).toEqual(200)
  })
})
