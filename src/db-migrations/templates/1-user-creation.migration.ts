// import { MigrationInterface, QueryRunner } from 'typeorm';
// import { USER_TABLE } from '../../dto/user.entity';

// export const schema = process.env.DB_SCHEMA || 'public';

// export class MerchantTableCreation1515769794451 implements MigrationInterface {
//   async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//     CREATE TABLE ${schema}.${USER_TABLE} (
//       id uuid NOT NULL PRIMARY KEY,
//       user_name text NOT NULL,
//       password text NOT NULL,
//       first_name text NOT NULL,
//       last_name text,
//       age decimal NOT NULL,
//     );`);
//   }

//   async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable(USER_TABLE);
//   }
// }
