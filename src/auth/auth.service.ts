import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(createUserDto: {
    fullName: string;
    password: string;
    email: string;
  }) {
    return await this.usersService.createUser(createUserDto);
  }

  async signIn(email: string, password: string) {
    return this.usersService.login({ email, password });
  }
}
