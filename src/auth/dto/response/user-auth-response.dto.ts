import { ApiProperty } from '@nestjs/swagger';

export class UserAuthResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
