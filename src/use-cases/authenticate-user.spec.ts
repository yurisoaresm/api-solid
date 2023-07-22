import { hash } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';

import { AuthenticateUser } from './authenticate-user';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository';

describe('Authenticate User', () => {
  let usersRepository: InMemoryUsersRepository;
  let authenticateUser: AuthenticateUser;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUser = new AuthenticateUser(usersRepository);
  });

  it('should be able to authenticate a user', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: await hash('123456', 6),
    });

    const request = { email: 'john.doe@email.com', password: '123456' };
    const { user } = await authenticateUser.execute(request);

    expect(user).toBeDefined();
  });

  it('should not be able to authenticate a user with invalid email', async () => {
    const request = { email: 'invalid@email.com', password: '123456' };

    await expect(authenticateUser.execute(request)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able to authenticate a user with invalid password', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: await hash('123456', 6),
    });

    const request = { email: 'john.doe@email.com', password: '654321' };

    await expect(authenticateUser.execute(request)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });
});
