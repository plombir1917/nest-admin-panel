import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  date: Date;
  @ManyToOne(() => Company, (company) => company.event)
  company: Company;
}
