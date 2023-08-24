import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/events.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MemberModule } from 'src/member/member.module';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { AccountService } from 'src/account/account.service';
import { AccountModule } from 'src/account/account.module';
import { Account } from 'src/account/entities/account.entity';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/roles.entity';
import { MemberToEvent } from './entities/memberToEvent.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Member,
      Account,
      Role,
      MemberToEvent,
      Company,
    ]),
    AuthModule,
    MemberModule,
    AccountModule,
  ],
  controllers: [EventController],
  providers: [
    EventService,
    MemberService,
    AccountService,
    RolesService,
    CompanyService,
  ],
})
export class EventModule {}
