import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}
  create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }

  findAll() {
    return this.eventRepository.find(); //SELECT * FROM event
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    return this.eventRepository.save({ ...event, ...updateEventDto });
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    return this.eventRepository.remove(event);
  }
}
