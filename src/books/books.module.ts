import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksSchema, Book } from 'src/schemas/book.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AzureBlobModule } from 'src/azure-blob/azure-blob.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  exports: [BooksService],
  providers: [BooksService, JwtStrategy],
  controllers: [BooksController],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BooksSchema }]),
    PassportModule,
    AzureBlobModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connectionString: configService.get<string>(
          'AZURE_STORAGE_CONNECTION_STRING',
        ),
      }),
    }),
  ],
})
export class BooksModule {}
