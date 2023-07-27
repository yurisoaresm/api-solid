import { describe, it, expect, beforeEach } from 'vitest';

import { FetchNearbyGyms } from './fetch-nearby-gyms';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository';

describe('Fetch Nearby Gyms', () => {
  let gymsRepository: InMemoryGymsRepository;
  let fetchNearbyGyms: FetchNearbyGyms;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    fetchNearbyGyms = new FetchNearbyGyms(gymsRepository);
  });

  it('should be able to fetch for nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      description: 'Near Gym 01 Description',
      phone: null,
      latitude: -14.4342759,
      longitude: -47.2654479,
    });

    await gymsRepository.create({
      name: 'Far Gym',
      description: 'Far Gym 02 Description',
      phone: null,
      latitude: -22.3911378,
      longitude: -41.7803645,
    });

    const { gyms } = await fetchNearbyGyms.execute({
      userLatitude: -14.4342759,
      userLongitude: -47.2654479,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })]);
  });
});
