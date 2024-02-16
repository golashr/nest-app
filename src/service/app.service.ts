import { Injectable } from '@nestjs/common';
import { CustomLogger } from '../modules/logger';

@Injectable()
export class AppService {
  constructor(private readonly logger: CustomLogger) {
    this.logger.setContext('AppController');
  }

  getHello(): string {
    this.logger.log('Hello');
    return 'Hello World from the app service!';
  }
}
