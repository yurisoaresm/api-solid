import { GetUserProfile } from '../get-user-profile';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository';

export function makeGetUserProfile() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfile = new GetUserProfile(usersRepository);

  return getUserProfile;
}
