import { ApiProperty } from '@nestjs/swagger';

export class UserAuthResponseDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
