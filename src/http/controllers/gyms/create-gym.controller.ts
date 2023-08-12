import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeCreateGym } from '@/use-cases/factories/make.create-gym';

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { name, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  const createGym = makeCreateGym();

  await createGym.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}
