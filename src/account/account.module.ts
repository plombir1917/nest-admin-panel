import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AuthService } from 'src/auth/auth.service';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/roles.entity';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Role, Company])],
  controllers: [AccountController],
  providers: [AccountService, AuthService, RolesService, CompanyService],
})
export class AccountModule {}
