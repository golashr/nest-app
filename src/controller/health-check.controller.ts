import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { Public } from '../decorators';

@Controller('health')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () =>
        this.httpHealthIndicator.pingCheck(
          'market balance ping',
          `https://api.kinesis.money/api/market-data-api/kinesiscoin/conversion?amount=1&currency=USD`,
        ),
      () =>
        this.httpHealthIndicator.responseCheck(
          'market balance response',
          `https://api.kinesis.money/api/market-data-api/kinesiscoin/conversion?amount=1&currency=USD`,
          (res) => res.status === 200,
        ),
    ]);
  }
}
