import { CreateUser } from '../create-user';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository';

export function makeCreateUser() {
  const usersRepository = new PrismaUsersRepository();
  const createUser = new CreateUser(usersRepository);

  return createUser;
}
