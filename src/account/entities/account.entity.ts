import { Company } from 'src/company/entities/company.entity';
import { Member } from 'src/member/entities/member.entity';
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

  @OneToOne(() => Company, (company) => company.account)
  company: Company;

  @OneToOne(() => Member, (member) => member.account)
  member: Member;

  @ManyToOne(() => Role, (role) => role.account)
  @JoinColumn()
  role: Role;
}
