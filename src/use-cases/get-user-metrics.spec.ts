import { describe, it, expect, beforeEach } from 'vitest';

import { GetUserMetrics } from './get-user-metrics';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory.check-ins.repository';

describe('Get User Metrics', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let getUserMetrics: GetUserMetrics;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserMetrics = new GetUserMetrics(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    const userId = 'user-id';

    for (let i = 1; i <= 2; i++) {
      await checkInsRepository.create({
        userId,
        gymId: `gym-${i}`,
      });
    }

    const { checkInsCount } = await getUserMetrics.execute({
      userId,
    });

    expect(checkInsCount).toEqual(2);
  });
});
