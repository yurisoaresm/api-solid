import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeValidateCheckIn } from '@/use-cases/factories/make.validate-check-in';

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckIn = makeValidateCheckIn();

  await validateCheckIn.execute({
    checkInId,
  });

  return reply.status(204).send();
}
