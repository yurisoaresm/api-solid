import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository';
import { CreateUser } from '@/use-cases/create-user';
import { AlreadyExistsError } from '@/use-cases/errors/already-exists.error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const createUser = new CreateUser(usersRepository);

    await createUser.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    } else {
      throw error;
    }
  }

  return reply.status(201).send();
}
