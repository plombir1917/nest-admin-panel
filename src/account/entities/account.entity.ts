import { Company } from 'src/company/entities/company.entity';
import { Role } from 'src/roles/entities/roles.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Company, (company) => company.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  company: Company;

  @ManyToOne(() => Role, (role) => role.account)
  @JoinColumn()
  role: Role;
}
