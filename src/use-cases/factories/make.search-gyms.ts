import { SearchGyms } from '../search-gyms';

import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository';

export function makeSearchGyms() {
  const gymsRepository = new PrismaGymsRepository();
  const searchGyms = new SearchGyms(gymsRepository);

  return searchGyms;
}
