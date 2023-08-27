import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;
}

export const UsersSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
