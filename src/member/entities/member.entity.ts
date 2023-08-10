import { Event } from 'src/events/entities/events.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
}
