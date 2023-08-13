import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books/books.controller';
import { BooksSchema } from './schemas/book.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
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
  controllers: [AppController, BooksController],
  providers: [AppService],
})
export class AppModule {}
