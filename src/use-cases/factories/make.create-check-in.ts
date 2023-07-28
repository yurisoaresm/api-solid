import { CreateCheckIn } from '../create-check-in';

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository';

export function makeCreateCheckIn() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const createCheckIn = new CreateCheckIn(checkInsRepository, gymsRepository);

  return createCheckIn;
}
