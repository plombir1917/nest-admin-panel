import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberToEvent } from './memberToEvent.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  place: string;

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => Company, (company) => company.event)
  @JoinColumn()
  company: Company;

  @OneToMany(() => MemberToEvent, (memberToEvent) => memberToEvent.event)
  memberToEvent: MemberToEvent[];
}
