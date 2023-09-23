import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { CreateBookDto } from './dto/book-create.dto';
import { UpdateBookDto } from './dto/book-update.dto';
import { throwBookNotFound } from './utils/errors-builder';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
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
      // TODO please note better way to handle http errors
      throwBookNotFound(id);
      // throw new HttpException(`Can't find book ${id}`, 404);
    }
    return book;
  }

  async deleteBook(bookId: string) {
    await this.bookModel.findOneAndDelete({ _id: bookId });
  }
}
