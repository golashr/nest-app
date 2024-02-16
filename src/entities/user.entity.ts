import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { RoleEntity } from './role.entity';

export const USER_TABLE = 'user';

@Entity(USER_TABLE)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 100,
  })
  userName: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  @Exclude()
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 20,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 20,
  })
  lastName: string;

  @Column({
    name: 'age',
    type: 'numeric',
  })
  age: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Transform(({ value }) => `${value.name}istrator`)
  role: RoleEntity;
}
