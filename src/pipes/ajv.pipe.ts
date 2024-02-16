import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import Ajv from 'ajv';
import { AjvCatSchema } from '../dto';

const ajv = new Ajv();

export class AjvValidationPipe implements PipeTransform {
  constructor(private schema: typeof AjvCatSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const validate = ajv.compile(this.schema);
      const valid = validate(value);
      console.log(`metadata? ${metadata} valid: ${JSON.stringify(valid)}`);
      if (!valid) {
        throw new Error('schema validation failed');
      }
      return value;
    } catch (error) {
      throw new BadRequestException(
        `Ajv Validation failed error ${JSON.stringify(error)}`,
      );
    }
  }
}
