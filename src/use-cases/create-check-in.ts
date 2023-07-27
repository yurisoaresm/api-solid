import { CheckIn } from '@prisma/client';

import { MaxDistanceError } from './errors/max-distance.error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

import { CheckInsRepository } from '@/repositories/check-ins.repository';
import { GymsRepository } from '@/repositories/gyms.repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

interface CreateCheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CreateCheckInResponse {
  checkIn: CheckIn;
}

export class CreateCheckIn {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}
  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CreateCheckInRequest): Promise<CreateCheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    const MAX_DISTANCE_IN_KM = 0.1; // 100 meters

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    });

    return { checkIn };
  }
}
