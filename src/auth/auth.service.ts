import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserAuthResponseDto } from './dto/response/user-auth-response.dto';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(createUserDto: CreateUserDto): Promise<UserAuthResponseDto> {
    return await this.usersService.createUser(createUserDto);
  }

  async signIn(email: string, password: string) {
    return this.usersService.login({ email, password });
  }
}
