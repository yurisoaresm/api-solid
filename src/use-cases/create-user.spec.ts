import { compare } from 'bcryptjs';
import { describe, it, expect, beforeEach } from 'vitest';

import { CreateUser } from './create-user';
import { AlreadyExistsError } from './errors/already-exists.error';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory.users.repository';

describe('Create User', () => {
  let usersRepository = new InMemoryUsersRepository();
  let createUser = new CreateUser(usersRepository);

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
  });

  it('should create a user', async () => {
    const request = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
    };

    const { user } = await createUser.execute(request);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(request.name);
    expect(user.email).toBe(request.email);
    expect(user.password).toBeDefined();
    expect(user.createdAt).toBeDefined();
  });

  it('should not create a user if email already exists', async () => {
    const request = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
    };

    await createUser.execute(request);

    await expect(() => createUser.execute(request)).rejects.toBeInstanceOf(
      AlreadyExistsError,
    );
  });

  it('should hash the password before saving the user', async () => {
    const request = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
    };

    const { user } = await createUser.execute(request);

    const isPasswordHashed = await compare(request.password, user.password);

    expect(isPasswordHashed).toBeTruthy();
  });
});
