import { UsePipes, Controller, Body, Get, Post } from '@nestjs/common';
import { CatService } from '../service';
import {
  CreateCatDtoZod,
  CreateCatDto,
  createCatZodSchema,
  AjvCatSchema,
} from '../dto';
import { Roles } from '../decorators';
import { ZodValidationPipe, AjvValidationPipe } from '../pipes';
import { CustomLogger } from '../modules/logger';

@Roles('user')
@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('CatController');
  }

  @Get('all')
  getAllCats() {
    this.logger.log(`get cats`);
    const myObservable$ = this.catService.findAll();
    myObservable$.subscribe(
      (value) => {
        console.log(`value ${JSON.stringify(value.data)}`);
        return;
      },
      (error) => console.log('Error:', error), // optional
      () => console.log('✅ Subscriber.completed 2'), // optional
    );
  }

  @Get()
  getCat() {
    this.logger.log(`get cat`);
    const myObservable$ = this.catService.findAll();
    myObservable$.subscribe(
      (value) => {
        console.log(`value ${JSON.stringify(value.data)}`);
        return;
      },
      (error) => console.log('Error:', error), // optional
      () => console.log('✅ Subscriber.completed 2'), // optional
    );
  }

  @Roles('admin')
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    // The `createUserDto` object has already been validated by NestJS
    // and contains only the properties defined in the `CreateCatDto` class.
    // You can use it to create a new user in your application.

    this.logger.log(`createCatDto  ${JSON.stringify(createCatDto)}`);
  }

  @Roles('admin')
  @Post('zod')
  @UsePipes(new ZodValidationPipe(createCatZodSchema))
  async createZod(@Body() createCatDtoZod: CreateCatDtoZod) {
    // The `createUserDto` object has already been validated by NestJS
    // and contains only the properties defined in the `CreateCatDtoZod` class.
    // You can use it to create a new user in your application.

    this.logger.log(`createCatDto  ${JSON.stringify(createCatDtoZod)}`);
  }

  @Roles('admin')
  @Post('ajv')
  @UsePipes(new AjvValidationPipe(AjvCatSchema))
  async createAjvd(@Body() createCatDtoZod: CreateCatDtoZod) {
    // The `createUserDto` object has already been validated by NestJS
    // and contains only the properties defined in the `CreateCatDtoZod` class.
    // You can use it to create a new user in your application.

    this.logger.log(`createCatDto  ${JSON.stringify(createCatDtoZod)}`);
  }
}
