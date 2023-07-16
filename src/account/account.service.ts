import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { ALREADY_REGISTERED_ERROR } from '../constants/exception.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const existAccount = await this.accountRepository.findOne({
      where: {
        email: createAccountDto.email,
      },
    });
    if (existAccount) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    const password = await encodePassword(createAccountDto.password);
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      password,
    });
    return this.accountRepository.save(newAccount);
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    return this.accountRepository.save({ ...account, ...updateAccountDto });
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    return this.accountRepository.remove(account);
  }
}
