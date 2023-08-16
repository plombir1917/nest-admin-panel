import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ACCOUNT_NOT_FOUND_ERROR,
  CANT_BE_EMPTY_ERROR,
  WRONG_PASSWORD_ERROR,
} from 'src/constants/exception.constants';
import { Account } from 'src/account/entities/account.entity';
import { comparePassword } from 'src/utils/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly authRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}
  async validateAccount(email: string, password: string) {
    if (!email) {
      throw new BadRequestException(CANT_BE_EMPTY_ERROR);
    }
    const account = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!account) {
      throw new UnauthorizedException(ACCOUNT_NOT_FOUND_ERROR);
    }
    if (!password) {
      throw new BadRequestException(CANT_BE_EMPTY_ERROR);
    }
    const isCorrectPassword = await comparePassword(password, account.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: account.email };
  }

  async login(login: string) {
    const payload = { login };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
