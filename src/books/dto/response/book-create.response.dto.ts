import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '../book-create.dto';

export class CreateBookResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: number;

  @ApiProperty({ enum: BookStatus })
  status: BookStatus;
}
