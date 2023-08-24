import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Account } from 'src/account/entities/account.entity';
import { comparePassword } from 'src/auth/utils/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly authRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}
  async validateAccount(email: string, password: string) {
    if (!email) {
      throw new BadRequestException('email не может быть пустым!');
    }
    const account = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!account) {
      throw new UnauthorizedException('Аккаунт не найден!');
    }
    if (!password) {
      throw new BadRequestException('password не может быть пустым');
    }
    const isCorrectPassword = await comparePassword(password, account.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль!');
    }
    return { email: account.email };
  }

  async login(id: number, name: string, email: string, roles: Role) {
    const payload = { id, name, email, roles };
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
      throw new NotFoundException('Аккаунт не найден!');
    }
    return account;
  }
}
