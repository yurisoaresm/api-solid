import { GetUserMetrics } from '../get-user-metrics';

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository';

export function makeGetUserMetrics() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const getUserMetrics = new GetUserMetrics(checkInsRepository);

  return getUserMetrics;
}
