import { Prisma } from '@prisma/client';

import { CheckInsRepository } from '../check-ins.repository';
import { UsersRepository } from '../users.repository';

import { prisma } from '@/lib/prisma';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }
}
