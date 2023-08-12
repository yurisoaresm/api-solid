import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Fetch Nearby Gyms Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JavaScript Gym',
        description: 'The best gym for JavaScript developers',
        phone: '123456789',
        latitude: -14.4342759,
        longitude: -47.2654479,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TypeScript Gym',
        description: 'The best gym for TypeScript developers',
        phone: '123456789',
        latitude: -22.3911378,
        longitude: -41.7803645,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLatitude: -14.4342759,
        userLongitude: -47.2654479,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'JavaScript Gym',
      }),
    ]);
  });
});
