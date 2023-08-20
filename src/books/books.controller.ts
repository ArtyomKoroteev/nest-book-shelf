import {
  Controller,
  Delete,
  Get,
  Body,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book-create.dto';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Post()
  async createBook(
    @Body()
    bookData: CreateBookDto,
  ) {
    const book = await this.booksService.create(bookData);
    return book;
  }

  @Patch(':id')
  updateBook(
    @Param('id')
    id: string,
    @Body()
    bookData: CreateBookDto,
  ) {
    this.booksService.updateBook(id, bookData);
  }

  @Get()
  async getBooks(): Promise<CreateBookDto[]> {
    const books = await this.booksService.getAllBooks();
    return books;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<CreateBookDto> {
    return await this.booksService.getBook(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.booksService.deleteBook(id);
  }
}
