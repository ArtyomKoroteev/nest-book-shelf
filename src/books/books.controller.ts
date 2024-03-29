import {
  Controller,
  Delete,
  Get,
  Body,
  Patch,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book-create.dto';
import { UpdateBookDto } from './dto/book-update.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth('jwt')
export class BooksController {
  constructor(private booksService: BooksService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBook(
    @Body()
    bookData: CreateBookDto,
  ) {
    return this.booksService.create(bookData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateBook(
    @Param('id')
    id: string,
    @Body()
    bookData: UpdateBookDto,
  ) {
    return this.booksService.updateBook(id, bookData);
  }

  @Get()
  async getBooks(): Promise<CreateBookDto[]> {
    return await this.booksService.getAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<CreateBookDto> {
    return await this.booksService.getBook(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.booksService.deleteBook(id);
  }
}
