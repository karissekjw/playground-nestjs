import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`
   }),
    UsersModule
  ]
})
export class AppModule {}
