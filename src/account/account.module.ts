import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AuthService } from 'src/auth/auth.service';
import { RolesModule } from 'src/roles/roles.module';
import { CompanyModule } from 'src/company/company.module';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Company]),
    CompanyModule,
    RolesModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AuthService],
})
export class AccountModule {}
