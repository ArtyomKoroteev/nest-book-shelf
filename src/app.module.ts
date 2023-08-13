import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books/books.controller';
import { BooksSchema } from './schemas/book.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule, BooksModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_CONNECTION_STRING'),
        dbName: 'books_shelf',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [config],
    }),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class AppModule {}
