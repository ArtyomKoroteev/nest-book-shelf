import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books/books.controller';
import { BooksSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://artyomkoroteev:Password1+@cluster0.edripov.mongodb.net/',
      { dbName: 'books_shelf' },
    ),
    MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }]),
  ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
