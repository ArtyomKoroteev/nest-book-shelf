import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { UserAuthResponseDto } from './dto/response/user-auth-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user.',
  })
  @ApiBody({
    description: 'List of properties for registration of new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully registered.',
    type: UserAuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong data for registration.',
  })
  @Post('register')
  async registerUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return await this.authService.register(createUserDto);
  }

  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate and log in a user.',
  })
  @ApiBody({
    description: 'List of properties for login of a user',
    type: LoginUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully logged in.',
    type: UserAuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong data for logging in.',
  })
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
