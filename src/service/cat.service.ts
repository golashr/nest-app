import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Cat } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class CatService implements OnModuleInit {
  private logger = new Logger('CatService');

  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    console.log('The CatService module has been initialized.');
  }

  findAll(): Observable<AxiosResponse<Cat[]>> {
    this.logger.log(`findAll()`);
    const response = this.httpService.get(
      'https://cat-fact.herokuapp.com/facts/?offset=0&limit=2',
    );
    // this.logger.log(`findAll : ${JSON.stringify(response)}`);
    return response;
  }
}
