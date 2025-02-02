import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { BookStatus } from 'src/books/dto/book-create.dto';
import { v4 as uuidv4 } from 'uuid';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true, trim: true, minlength: 3, maxlength: 50 })
  @IsString()
  @IsNotEmpty()
  author: string;

  @Prop({ trim: true, maxlength: 500 })
  @IsString()
  @IsOptional()
  description: string;

  @Prop({ type: Number, min: 0, max: 5, default: 0 })
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @Prop({ type: String, enum: BookStatus, default: BookStatus.toRead })
  @IsEnum(BookStatus)
  status: BookStatus;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Book).set(
  'versionKey',
  false,
);
