import { ValidateCheckIn } from '../validate-check-in';

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.check-ins.repository';

export function makeValidateCheckIn() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validateCheckIn = new ValidateCheckIn(checkInsRepository);

  return validateCheckIn;
}
