import { describe, it, expect, beforeEach } from 'vitest';

import { CreateGym } from './create-gym';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory.gyms.repository';

describe('Create Gym', () => {
  let gymsRepository: InMemoryGymsRepository;
  let createGym: CreateGym;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGym = new CreateGym(gymsRepository);
  });

  it('should be able to create a gym', async () => {
    const request = {
      name: 'Gym',
      description: null,
      phone: null,
      latitude: -14.4342759,
      longitude: -67.4965606,
    };

    const { gym } = await createGym.execute(request);

    expect(gym).toBeDefined();
    expect(gym.id).toBeDefined();
    expect(gym.name).toBe(request.name);
    expect(gym.description).toBe(request.description);
    expect(gym.phone).toBeDefined();
    expect(gym.latitude).toBeDefined();
    expect(gym.longitude).toBeDefined();
  });
});
