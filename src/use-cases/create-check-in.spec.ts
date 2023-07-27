import { Decimal } from '@prisma/client/runtime/library';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { CreateCheckIn } from './create-check-in';
import { MaxDistanceError } from './errors/max-distance.error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory.check-ins.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository';

describe('Create Check-in', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymsRepository;
  let createCheckIn: CreateCheckIn;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    createCheckIn = new CreateCheckIn(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-id',
      name: 'Gym Name',
      description: 'Gym Description',
      phone: '',
      latitude: 0,
      longitude: 0,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in (create a check-in)', async () => {
    const request = {
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    };

    const { checkIn } = await createCheckIn.execute(request);

    expect(checkIn).toBeDefined();
    expect(checkIn.id).toBeDefined();
    expect(checkIn.gymId).toBe(request.gymId);
    expect(checkIn.userId).toBe(request.userId);
    expect(checkIn.validatedAt).toBeDefined();
    expect(checkIn.createdAt).toBeDefined();
  });

  it('should not be able to check in on inexistent gym', async () => {
    const request = {
      gymId: 'inexistent-gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    };

    await expect(createCheckIn.execute(request)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date('2023-01-01 10:00:00'));

    const request = {
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    };

    await createCheckIn.execute(request);

    vi.setSystemTime(new Date('2023-01-02 10:00:00'));

    const { checkIn } = await createCheckIn.execute(request);

    expect(checkIn).toBeDefined();
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2023-01-01 10:00:00'));

    const request = {
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    };

    await createCheckIn.execute(request);

    await expect(createCheckIn.execute(request)).rejects.toBeInstanceOf(
      MaxNumberOfCheckInsError,
    );
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'distant-gym-id',
      name: 'Distant Gym Name',
      description: 'Distant Gym Description',
      phone: '',
      latitude: new Decimal(-14.3263695),
      longitude: new Decimal(-47.2800376),
    });

    const request = {
      gymId: 'distant-gym-id',
      userId: 'user-id',
      userLatitude: -14.4342759,
      userLongitude: -47.2654479,
    };

    await expect(createCheckIn.execute(request)).rejects.toBeInstanceOf(
      MaxDistanceError,
    );
  });
});
