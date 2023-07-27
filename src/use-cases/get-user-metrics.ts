import { CheckInsRepository } from '@/repositories/check-ins.repository';

interface GetUserMetricsInRequest {
  userId: string;
}

interface GetUserMetricsInResponse {
  checkInsCount: number;
}

export class GetUserMetrics {
  constructor(private checkInsRepository: CheckInsRepository) {}
  async execute({
    userId,
  }: GetUserMetricsInRequest): Promise<GetUserMetricsInResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
