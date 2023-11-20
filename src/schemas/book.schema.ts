import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BookStatus } from 'src/books/dto/book-create.dto';
import { v4 as uuidv4 } from 'uuid';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ type: String, default: uuidv4() })
  _id: string;

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

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Book).set(
  'versionKey',
  false,
);
