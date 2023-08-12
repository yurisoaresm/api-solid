import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeFetchUserCheckInsHistory } from '@/use-cases/factories/make.fetch-user-check-ins-history';

export async function fetchUserCheckInsHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserCheckInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = fetchUserCheckInsHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistory = makeFetchUserCheckInsHistory();

  const { checkIns } = await fetchUserCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
