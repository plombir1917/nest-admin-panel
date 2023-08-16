/* eslint-disable prettier/prettier */
import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: string;
  @Column()
  description: string;

  @OneToMany(() => Account, (account) => account.role)
  @JoinColumn()
  account: Account;
}
