import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { CreateBookDto } from './dto/book-create.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  create(createBookDto: CreateBookDto): Promise<CreateBookDto> {
    console.log(createBookDto);
    const doc = new this.bookModel(createBookDto);
    return doc.save();
  }

  async getAllBooks(): Promise<CreateBookDto[]> {
    return this.bookModel.find().exec();
  }
}
