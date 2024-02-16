import { Expose, Transform } from '@nestjs/class-transformer';

export class UserTransformer {
  @Expose() id: number;
  @Expose() firstName: string;
  @Expose() lastName: string;
}

export const fromPlainUser = {
  unknownProp: 'hello there',
  firstName: 'Umed',
  lastName: 'Khudoiberdiev',
};
