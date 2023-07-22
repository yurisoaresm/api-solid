import { Prisma, User } from '@prisma/client';

import { UsersRepository } from '../users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: String(this.users.length + 1),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }
}
