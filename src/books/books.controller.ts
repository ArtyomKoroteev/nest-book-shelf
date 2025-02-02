import {
  Controller,
  Delete,
  Get,
  Body,
  Patch,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { AzureBlobService } from 'src/azure-blob/azure-blob.service';
import { CreateBookDto } from './dto/book-create.dto';
import { UpdateBookDto } from './dto/book-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookResponseDto } from './dto/response/book-create.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/types';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['.jpg', '.jpeg', '.png'];

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth('jwt')
export class BooksController {
  constructor(
    private booksService: BooksService,
    private azureBlobService: AzureBlobService,
  ) {}
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
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.booksService.deleteBook(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if (ALLOWED_FILE_TYPES.includes(ext)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  @ApiOperation({ summary: 'Uploads a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const name = await this.booksService.uploadToBlob(file);
    return await this.booksService.getBlobUrl(name);
  }
}
