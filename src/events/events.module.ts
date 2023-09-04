/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/events.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MemberModule } from 'src/member/member.module';
import { Member } from 'src/member/entities/member.entity';
import { AccountModule } from 'src/account/account.module';
import { MemberToEvent } from './entities/memberToEvent.entity';
import { RolesModule } from 'src/roles/roles.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Member, MemberToEvent]),
    AuthModule,
    MemberModule,
    AccountModule,
    RolesModule,
    CompanyModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventModule],
})
export class EventModule {}
