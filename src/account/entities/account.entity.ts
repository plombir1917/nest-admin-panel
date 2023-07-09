import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin?: boolean;

  @OneToOne(() => Company, (company) => company.account, {
    onDelete: 'CASCADE',
  })
  company: Company;
}
