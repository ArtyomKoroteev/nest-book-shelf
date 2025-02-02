import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { CreateBookDto } from './dto/book-create.dto';
import { UpdateBookDto } from './dto/book-update.dto';
import { throwBookNotFound } from './utils/errors-builder';
import { AzureBlobService } from 'src/azure-blob/azure-blob.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private azureBlobService: AzureBlobService,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const doc = new this.bookModel(createBookDto);
      const book = await doc.save();
      return book;
    } catch (error) {
      throw new HttpException(`Book was not added ${error}`, 400);
    }
  }

  async getAllBooks(): Promise<Book[]> {
    try {
      return this.bookModel.find().exec();
    } catch (error) {
      throw new HttpException(`Book was not found ${error}`, 400);
    }
  }

  async updateBook(postId: string, bookData: UpdateBookDto) {
    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        postId,
        bookData,
        {
          new: true,
          runValidators: true,
        },
      );
      return updatedBook;
    } catch (error) {
      throw new HttpException(`Cant update book ${error}`, 400);
    }
  }

  async getBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throwBookNotFound(id);
    }
    return book;
  }

  async deleteBook(bookId: string) {
    try {
      await this.bookModel.findOneAndDelete({ _id: bookId });
    } catch (e: unknown) {
      throwBookNotFound(bookId);
    }
  }

  async uploadToBlob(file: Express.Multer.File) {
    const blobName = uuidv4() as string;
    await this.azureBlobService.setBlobData(
      'books-storage',
      blobName,
      file.buffer,
    );
    return blobName;
  }

  async getBlobUrl(blobName: string): Promise<string> {
    return this.azureBlobService.getBlobUrl('books-storage', blobName);
  }
}
