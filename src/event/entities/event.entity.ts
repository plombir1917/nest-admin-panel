import { Company } from 'src/company/entities/company.entity';
import { Member } from 'src/member/entities/member.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column()
  date: string;
  @ManyToOne(() => Company, (company) => company.event)
  @JoinColumn()
  company: Company;
  @ManyToMany(() => Member, (member) => member.event)
  member: Member[];
}
