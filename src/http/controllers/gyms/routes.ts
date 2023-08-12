import { FastifyInstance } from 'fastify';

import { createGym } from './create-gym.controller';
import { fetchNearbyGyms } from './fetch-nearby-gyms.controller';
import { searchGyms } from './search-gyms.controller';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', searchGyms);
  app.get('/gyms/nearby', fetchNearbyGyms);

  app.post('/gyms', createGym);
}
