import { AuthenticateUser } from '../authenticate-user';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository';

export function makeAuthenticateUser() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUser = new AuthenticateUser(userRepository);

  return authenticateUser;
}
