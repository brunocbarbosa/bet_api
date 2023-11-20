import { app } from '@/app'
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

    const res = await request(app.server).get(
      `/tickets/check/${ticket.id}/${contest.id}`,
    )

    expect(res.statusCode).toEqual(200)
  })
})
