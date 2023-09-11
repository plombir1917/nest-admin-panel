import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/decorators/user.decorator';
import { Account } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('register')
  async register(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const login = await this.authService.validateAccount(email, password);
    const account = await this.authService.findAccount(email);
    const company = await this.companyService.findOneByEmail(email);
    return this.authService.login(
      account.id,
      account.name,
      login.email,
      account.role,
      company,
    );
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findMyAccount(@User() account: Account) {
    return this.accountService.findOne(account.id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('profile')
  updateMyAccount(
    @Body() updateAccountDto: UpdateAccountDto,
    @User() account: Account,
  ) {
    return this.accountService.update(account.id, updateAccountDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
