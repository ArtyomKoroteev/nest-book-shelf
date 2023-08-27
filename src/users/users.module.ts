import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, JwtService],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }])],
})
export class UsersModule {}
