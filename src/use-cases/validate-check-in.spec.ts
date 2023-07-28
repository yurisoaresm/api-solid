import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';

import { LateCheckInValidationError } from './errors/late-check-in-validation-error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { ValidateCheckIn } from './validate-check-in';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory.check-ins.repository';

describe('Create Check-in', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let validateCheckIn: ValidateCheckIn;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    validateCheckIn = new ValidateCheckIn(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-id',
      userId: 'user-id',
    });

    const { checkIn } = await validateCheckIn.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
    expect(checkInsRepository.checkIns[0].validatedAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      validateCheckIn.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 min of its creation', async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 12, 40));

    const checkIn = await checkInsRepository.create({
      gymId: 'gym-id',
      userId: 'user-id',
    });

    vi.advanceTimersByTime(21 * 60 * 1000); // 21 min

    await expect(() =>
      validateCheckIn.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
