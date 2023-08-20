import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
import { Role } from 'src/roles/entities/roles.entity';
import 'dotenv/config';

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

  async login(id: number, login: string, roles: Role) {
    const payload = { id, login, roles };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async findAccount(email: string) {
    const account = await this.authRepository.findOne({
      where: {
        email: email,
      },
      relations: { role: true },
    });
    if (!account) {
      throw new NotFoundException(ACCOUNT_NOT_FOUND_ERROR);
    }
    return account;
  }
}
