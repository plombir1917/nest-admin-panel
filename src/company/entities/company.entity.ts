import { Account } from 'src/account/entities/account.entity';
import { Event } from 'src/events/entities/events.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  info: string;
  @OneToOne(() => Account, (account) => account.company)
  account: Account;
  @OneToMany(() => Event, (event) => event.company)
  event: Event[];
}
