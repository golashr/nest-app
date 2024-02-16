import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator for rate limiting based on email addresses.
 * This decorator sets metadata for rate limiting on specific endpoints.
 *
 * @param limit The maximum number of requests allowed within the specified time window.
 * @param ttl The time-to-live (TTL) duration in seconds for the rate limiting window.
 *
 * Example usage:
 *   @ThrottleByEmail(10, 60) // Allow up to 10 requests per minute for the decorated endpoint.
 */
export const ThrottleByEmail = (limit: number, ttl: number) => {
  return SetMetadata('emailThrottle', { limit, ttl });
};
