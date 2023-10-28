import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const res = await request(app.server)
      .post('/contests')
      .send({
        name: 'Mega Money',
        number: 2328,
        min_number: 5,
        max_number: 15,
        prize: 1000000,
        raffle_date: new Date('10/05/2023'),
      })

    expect(res.statusCode).toEqual(201)
  })
})
