import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { CreateBookDto } from './dto/book-create.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const doc = new this.bookModel(createBookDto);
    const book = await doc.save();
    return book;
  }

  async getAllBooks(): Promise<CreateBookDto[]> {
    return this.bookModel.find().exec();
  }

  async updateBook(postId: string, bookData: CreateBookDto): Promise<void> {
    await this.bookModel.findByIdAndUpdate(postId, bookData, {
      new: true,
      runValidators: true,
    });
  }

  async getBook(id: string): Promise<CreateBookDto> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new HttpException(`Can't find book ${id}`, 404);
    }
    return book;
  }

  async deleteBook(bookId: string) {
    await this.bookModel.findOneAndDelete({ _id: bookId });
  }
}
