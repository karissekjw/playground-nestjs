import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Expose, Exclude } from 'class-transformer';

export class UserEntity implements User {
  // add attribute to swagger api as UserEntity schema
  @ApiProperty()
  // expose attribute as a serializer
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
