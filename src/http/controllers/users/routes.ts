import { FastifyInstance } from 'fastify';

import { authenticate } from './authenticate.controller';
import { profile } from './profile.controller';
import { register } from './register.controller';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJWT] }, profile);

  app.post('/users', register);
  app.post('/sessions', authenticate);
}
