import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeCreateCheckIn } from '@/use-cases/factories/make.create-check-in';

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  );

  const createCheckIn = makeCreateCheckIn();

  await createCheckIn.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  });

  return reply.status(201).send();
}
