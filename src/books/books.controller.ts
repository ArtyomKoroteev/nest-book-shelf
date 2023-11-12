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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book-create.dto';
import { UpdateBookDto } from './dto/book-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookResponseDto } from './dto/response/book-create.response.dto';

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth('jwt')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({
    summary: 'Create a New Book',
    description: 'Create a new book.',
  })
  @ApiBody({
    description: 'List of properties for adding book',
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateBookResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect creation',
  })
  @ApiResponse({
    status: 401,
    description: 'User Unauthorized',
  })
  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBook(@Body() bookData: CreateBookDto) {
    return this.booksService.create(bookData);
  }

  @ApiOperation({
    summary: 'Update a Book',
    description: 'Update details of a specific book by providing its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the book to be updated.',
  })
  // @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() bookData: UpdateBookDto) {
    return this.booksService.updateBook(id, bookData);
  }

  @ApiOperation({
    summary: 'Get All Books',
    description: 'Get a list of all books.',
  })
  @Get()
  async getBooks(): Promise<CreateBookDto[]> {
    return await this.booksService.getAllBooks();
  }

  @ApiOperation({
    summary: 'Get a Single Book',
    description: 'Get details of a specific book by providing its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the book',
  })
  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<CreateBookDto> {
    return await this.booksService.getBook(id);
  }

  @ApiOperation({
    summary: 'Delete a Book',
    description: 'Delete a specific book by providing its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the book to be deleted.',
  })
  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.booksService.deleteBook(id);
  }
}
