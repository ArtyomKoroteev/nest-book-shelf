import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema, Book } from 'src/schemas/book.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  exports: [BooksService],
  providers: [BooksService, JwtStrategy],
  controllers: [BooksController],
  imports: [
    // TODO please note Book.name better than just string 'Book'
    // MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BooksSchema }]),
    PassportModule,
  ],
})
export class BooksModule {}
