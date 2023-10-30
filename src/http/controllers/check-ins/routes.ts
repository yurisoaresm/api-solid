import { FastifyInstance } from 'fastify';

import { createCheckIn } from './create-check-in.controller';
import { fetchUserCheckInsHistory } from './fetch-user-check-ins-history.controller';
import { getUserMetrics } from './get-user-metrics.controller';
import { validateCheckIn } from './validate-check-in.controller';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/history', fetchUserCheckInsHistory);
  app.get('/check-ins/metrics', getUserMetrics);

  app.post('/gyms/:gymId/check-ins', createCheckIn);
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: verifyUserRole('ADMIN') },
    validateCheckIn,
  );
}
