import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/user-create.dto';
import { UserAuthResponseDto } from 'src/auth/dto/response/user-auth-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserAuthResponseDto> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const doc = new this.userModel({
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      passwordHash,
      avatartUrl: '',
    });

    const user = await doc.save();

    const token = await this.jwtService.signAsync(
      {
        userId: user.id,
        fullName: user.fullName,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      token,
      fullName: user.fullName,
      email: user.email,
    };
  }

  async login(loginData: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: loginData.email });

    if (!user) {
      throw new HttpException('User not found', 403);
    }

    const isValidPass = bcrypt.compare(loginData.password, user.passwordHash);

    if (!isValidPass) {
      throw new HttpException('Wrong email or password', 403);
    }

    const token = await this.jwtService.signAsync(
      {
        userId: user.id,
        fullName: user.fullName,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      token,
      fullName: user.fullName,
      email: user.email,
    };
  }
}
