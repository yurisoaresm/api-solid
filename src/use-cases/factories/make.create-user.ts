import { CreateUser } from '../create-user';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository';

export function makeCreateUser() {
  const userRepository = new PrismaUsersRepository();
  const createUser = new CreateUser(userRepository);

  return createUser;
}
