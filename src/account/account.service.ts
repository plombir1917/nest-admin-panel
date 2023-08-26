import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { encodePassword } from 'src/auth/utils/bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private rolesService: RolesService,
    private companyService: CompanyService,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const existAccount = await this.accountRepository.findOne({
      where: {
        email: createAccountDto.email,
      },
    });
    if (existAccount) {
      throw new BadRequestException('Такой аккаунт уже зарегистрирован!');
    }
    const password = await encodePassword(createAccountDto.password);
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      password,
    });
    const company = await this.companyService.findOneByEmail(newAccount.email);
    if (!company) {
      newAccount.role = await this.rolesService.getRoleByValue('USER');
      return this.accountRepository.save(newAccount);
    } else {
      newAccount.role = await this.rolesService.getRoleByValue('ADMIN');
      company.account = newAccount;
      return this.companyRepository.save(company);
    }
  }

  async findAll() {
    const account = await this.accountRepository.find();
    if (!account.length) {
      throw new NotFoundException('Аккаунт не найден!');
    }
    return account;
  }

  async findOne(id: number) {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException('Аккаунт не найден!');
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    if (!account) {
      throw new NotFoundException('Аккаунт не найден!');
    }
    return this.accountRepository.save({ ...account, ...updateAccountDto });
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    if (!account) {
      throw new NotFoundException('Аккаунт не найден!');
    }
    return this.accountRepository.remove(account);
  }
}
