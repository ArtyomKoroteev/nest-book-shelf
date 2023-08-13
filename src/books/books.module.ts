import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema } from 'src/schemas/book.schema';

@Module({
  exports: [BooksService],
  providers: [BooksService],
  controllers: [BooksController],
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }])],
})
export class BooksModule {}
