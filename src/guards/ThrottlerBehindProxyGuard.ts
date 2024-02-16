import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const userIpAddress =
      (req.header('x-forwarded-for') || '').split(',')[0] ||
      req.connection!.remoteAddress!;
    if (userIpAddress) {
      return userIpAddress;
    }

    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }

  protected generateKey(context, suffix) {
    const prefix = `${context.getClass().name}-${context.getHandler().name}`;
    return `${prefix}-${suffix}`;
  }
}
