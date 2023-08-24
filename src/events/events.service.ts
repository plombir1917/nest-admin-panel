import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/events.entity';
import { MemberToEvent } from './entities/memberToEvent.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(MemberToEvent)
    private memberToEventRepository: Repository<MemberToEvent>,
  ) {}
  create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }

  async subscribe(member: Member, eventId: number) {
    const event = await this.findOne(eventId);
    const newSign = this.memberToEventRepository.create({
      member,
      event,
    });
    return this.memberToEventRepository.save(newSign);
  }

  async findAll() {
    const events = await this.eventRepository.find();
    if (!events.length) {
      throw new NotFoundException('Мероприятие не найдено!');
    }
    return events;
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено!');
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено!');
    }
    return this.eventRepository.save({ ...event, ...updateEventDto });
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено!');
    }
    return this.eventRepository.remove(event);
  }

  async deleteMemberToEvent(id: number) {
    const sign = await this.memberToEventRepository.delete({
      id,
    });
    return sign;
  }
}
