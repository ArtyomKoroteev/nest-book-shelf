import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books/books.controller';
import { BooksSchema } from './schemas/book.schema';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://artyomkoroteev:Password1@cluster0.edripov.mongodb.net',
      { dbName: 'books_shelf' },
    ),
    MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [config],
    }),
  ],
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
