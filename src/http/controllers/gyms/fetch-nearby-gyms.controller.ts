import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeFetchNearbyGyms } from '@/use-cases/factories/make.fetch-nearby-gyms';

export async function fetchNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyGymsQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { userLatitude, userLongitude } = fetchNearbyGymsQuerySchema.parse(
    request.query,
  );

  const fetchNearbyGyms = makeFetchNearbyGyms();

  const { gyms } = await fetchNearbyGyms.execute({
    userLatitude,
    userLongitude,
  });

  return reply.status(200).send({ gyms });
}
