import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async loginUser(
    @Body()
    loginUserDto: LoginUserDto,
  ) {
    return await this.authService.signIn(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
