import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum BookStatus {
  read = 'read',
  inProgress = 'in progress',
  toRead = 'to read',
}

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    enum: BookStatus,
  })
  @IsEnum(BookStatus)
  @IsNotEmpty()
  status: BookStatus;
}
