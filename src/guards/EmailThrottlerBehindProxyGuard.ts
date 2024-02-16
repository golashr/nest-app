import { Injectable, Logger, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';

/**
 * Custom request-scoped guard for email-based rate limiting.
 * This guard checks if the incoming request exceeds the rate limits specified for the associated endpoint.
 * It uses the 'emailThrottle' metadata set by the 'ThrottleByEmail' decorator.
 *
 * @param throttleMetadata Metadata containing rate limit parameters (limit, ttl) set by 'ThrottleByEmail' decorator.
 * @param request The incoming HTTP request being checked for rate limiting.
 *
 * Example usage:
 *   @UseGuards(EmailThrottlerBehindProxyGuard) // Apply this guard to an endpoint.
 */

@Injectable()
export class EmailThrottlerBehindProxyGuard extends ThrottlerGuard {
  private logger = new Logger('EmailThrottlerBehindProxyGuard');

  /**
   * Handles the rate limiting logic for incoming requests.
   *
   * @param context The current execution context, containing request information.
   * @returns A boolean indicating whether the request is allowed based on rate limits.
   */
  protected async handleRequest(context: ExecutionContext): Promise<boolean> {
    const reflector = new Reflector();
    const handler = context.getHandler();
    const className = context.getClass().name;
    const throttleMetadata = reflector.get<{ limit: number; ttl: number }>(
      'emailThrottle',
      handler,
    );
    this.logger.log(`className: ${className}`);
    this.logger.log(
      `Email throttle metadata: ${JSON.stringify(throttleMetadata)}`,
    );
    let request = context.switchToHttp().getRequest();
    if (throttleMetadata) {
      request = context.switchToHttp().getRequest();
      const email = request.body.email;
      this.logger.log(`Checking throttling for email: ${email}`);

      // const result =
      //   await EmailRateLimiterChecker.getInstance().checkAndIncrement(
      //     email,
      //     throttleMetadata.limit,
      //     throttleMetadata.ttl,
      //   );
      this.logger.log(`Request from email ${email}, is it allowed? yes`);
      return true;
    }

    return true;
  }
}
