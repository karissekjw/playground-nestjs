import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
