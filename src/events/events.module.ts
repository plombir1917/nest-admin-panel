/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/events.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MemberModule } from 'src/member/member.module';
import { AccountModule } from 'src/account/account.module';
import { MemberToEvent } from './entities/memberToEvent.entity';
import { RolesModule } from 'src/roles/roles.module';
import { CompanyModule } from 'src/company/company.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, MemberToEvent]),
    AuthModule,
    MemberModule,
    AccountModule,
    RolesModule,
    CompanyModule,
  ],
  controllers: [EventController],
  providers: [EventService, FilesService],
})
export class EventModule {}
