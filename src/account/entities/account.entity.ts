import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToOne(() => Company, (company) => company.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  company: Company;
}
