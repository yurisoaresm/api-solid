import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { AlreadyExistsError } from './errors/already-exists.error';

import { UsersRepository } from '@/repositories/users.repository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AlreadyExistsError(`User with email ${email} already exists`);
    }

    const hashedPassword = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return { user };
  }
}
