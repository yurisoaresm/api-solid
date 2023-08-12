import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetUserMetrics } from '@/use-cases/factories/make.get-user-metrics';

export async function getUserMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetrics = makeGetUserMetrics();

  const { checkInsCount } = await getUserMetrics.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
