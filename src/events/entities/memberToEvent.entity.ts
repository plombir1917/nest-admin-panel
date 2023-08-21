/* eslint-disable prettier/prettier */
import { Member } from 'src/member/entities/member.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Event } from './events.entity';

@Entity()
export class MemberToEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.memberToEvent)
  @JoinColumn()
  member: Member;

  @ManyToOne(() => Event, (event) => event.memberToEvent)
  @JoinColumn()
  event: Event;
}
