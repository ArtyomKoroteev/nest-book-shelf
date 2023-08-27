import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BookStatus } from 'src/books/dto/book-create.dto';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  id: string;

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
