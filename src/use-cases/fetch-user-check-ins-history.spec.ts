import { describe, it, expect, beforeEach } from 'vitest';

import { FetchUserCheckInsHistory } from './fetch-user-check-ins-history';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory.check-ins.repository';

describe('Fetch User Check-ins History', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let fetchUserCheckInsHistory: FetchUserCheckInsHistory;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInsHistory = new FetchUserCheckInsHistory(checkInsRepository);
  });

  it('should be able to fetch check-ins history', async () => {
    const userId = 'user-id';

    await checkInsRepository.create({
      userId,
      gymId: 'gym-01',
    });

    await checkInsRepository.create({
      userId,
      gymId: 'gym-02',
    });

    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId,
      page: 1,
    });

    expect(checkIns).toBeDefined();
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ]);
  });

  it('should be able to fetch paginated check-ins history', async () => {
    const userId = 'user-01';

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        userId,
        gymId: `gym-${i}`,
      });
    }

    const request = {
      userId: 'user-01',
      page: 2,
    };

    const { checkIns } = await fetchUserCheckInsHistory.execute(request);

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ]);
  });
});
