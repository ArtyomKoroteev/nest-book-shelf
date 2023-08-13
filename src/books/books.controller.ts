import { Controller, Delete, Get, Body, Patch, Post } from '@nestjs/common';
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
  ): Promise<CreateBookDto> {
    console.log(bookData, 'bookData');
    const book = await this.booksService.create(bookData);
    return book;
  }

  @Patch(':id')
  updateBook(): string {
    return 'update book by id';
  }

  @Get()
  async getBooks(): Promise<CreateBookDto[]> {
    const books = await this.booksService.getAllBooks();
    return books;
  }

  @Get(':id')
  getBookById(): string {
    return 'get book by id';
  }

  @Delete(':id')
  deleteBook(): string {
    return 'delete book by id';
  }
}
