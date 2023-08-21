import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Account } from 'src/account/entities/account.entity';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Account, Role])],
  controllers: [MemberController],
  providers: [MemberService, RolesService],
})
export class MemberModule {}
