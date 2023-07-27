import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';

import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { GetUserProfile } from './get-user-profile';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository';

describe('Get User Profile', () => {
  let usersRepository: InMemoryUsersRepository;
  let getUserProfile: GetUserProfile;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfile = new GetUserProfile(usersRepository);
  });

  it('should be able to get a user profile', async () => {
    const newUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: await hash('123456', 6),
    });

    const { user } = await getUserProfile.execute({ userId: newUser.id });

    expect(user).toBeDefined();
    expect(user.id).toBe(newUser.id);
  });

  it('should not be able to get a user profile with invalid id', async () => {
    await expect(
      getUserProfile.execute({ userId: 'invalid-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
