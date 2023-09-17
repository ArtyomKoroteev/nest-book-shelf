import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BookStatus } from 'src/books/dto/book-create.dto';

export type BookDocument = HydratedDocument<Book>;

// please add next auto generated fields: createdAt and updatedAt
@Schema()
export class Book {
  @Prop()
  // TODO it isn't string, it's ObjectId from mongoose library. if you want use string need provide default value with library uuid, example below
  id: Types.ObjectId;

  // @Prop({ type: String, default: uuidv4() })
  // _id: string;

  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  status: BookStatus;
}

export const BooksSchema = SchemaFactory.createForClass(Book).set(
  'versionKey',
  false,
);
