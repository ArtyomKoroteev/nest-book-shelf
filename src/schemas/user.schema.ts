import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @Prop({ required: true, unique: true, trim: true })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Prop({ required: true })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  passwordHash: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  @IsEnum(Role, { message: 'Role must be either user or admin' })
  role: Role;
}

export const UsersSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
