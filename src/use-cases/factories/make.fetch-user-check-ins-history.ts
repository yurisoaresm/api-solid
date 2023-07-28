import { FetchUserCheckInsHistory } from '../fetch-user-check-ins-history';

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository';

export function makeFetchUserCheckInsHistory() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInsHistory = new FetchUserCheckInsHistory(
    checkInsRepository,
  );

  return fetchUserCheckInsHistory;
}
