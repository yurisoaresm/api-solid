import { FetchNearbyGyms } from '../fetch-nearby-gyms';

import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository';

export function makeFetchNearbyGyms() {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNearbyGyms = new FetchNearbyGyms(gymsRepository);

  return fetchNearbyGyms;
}
