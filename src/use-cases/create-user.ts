import { hash } from 'bcryptjs';

import { AlreadyExistsError } from './errors/already-exists.error';

import { UsersRepository } from '@/repositories/users.repository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ name, email, password }: CreateUserRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AlreadyExistsError(`User with email ${email} already exists`);
    }

    const hashedPassword = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
