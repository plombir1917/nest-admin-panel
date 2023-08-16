import { Account } from 'src/account/entities/account.entity';
import { Event } from 'src/events/entities/events.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @ManyToMany(() => Event, (event) => event.member)
  @JoinTable()
  event: Event[];

  @OneToOne(() => Account, (account) => account.member)
  @JoinColumn()
  account: Account;
}
