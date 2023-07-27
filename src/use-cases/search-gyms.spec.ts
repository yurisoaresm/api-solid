import { describe, it, expect, beforeEach } from 'vitest';

import { SearchGyms } from './search-gyms';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository';

describe('Search Gyms', () => {
  let gymsRepository: InMemoryGymsRepository;
  let searchGyms: SearchGyms;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    searchGyms = new SearchGyms(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Gym 01',
      description: 'Gym 01 Description',
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      name: 'Gym 02',
      description: 'Gym 02 Description',
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await searchGyms.execute({
      query: 'Gym',
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym 01' }),
      expect.objectContaining({ name: 'Gym 02' }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      });
    }

    const { gyms } = await searchGyms.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'JavaScript Gym 21' }),
      expect.objectContaining({ name: 'JavaScript Gym 22' }),
    ]);
  });
});
