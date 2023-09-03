import { Account } from 'src/account/entities/account.entity';
import { MemberToEvent } from 'src/events/entities/memberToEvent.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => MemberToEvent, (memberToEvent) => memberToEvent.member)
  memberToEvent: MemberToEvent[];

  @OneToOne(() => Account, (account) => account.member)
  @JoinColumn()
  account: Account;
}
