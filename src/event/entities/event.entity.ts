import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
