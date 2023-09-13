import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  NotFoundException,
  HttpCode,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/decorators/user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { MemberService } from 'src/member/member.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberToEvent } from './entities/memberToEvent.entity';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponce } from '../files/dto/file-element.responce';
import { FilesService } from '../files/files.service';

@Controller('events')
export class EventController {
  constructor(
    @InjectRepository(MemberToEvent)
    private memberToEventRepository: Repository<MemberToEvent>,
    private readonly eventService: EventService,
    private readonly memberService: MemberService,
    private readonly filesService: FilesService,
  ) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createEventDto: CreateEventDto, @User() account: Account) {
    return this.eventService.create(createEventDto, account.company);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('subscribe/:id')
  async subscribe(@User() account: Account, @Param('id') eventId: string) {
    let member = await this.memberService.findOneByAccount(account);
    if (!member) {
      member = await this.memberService.create(account);
    }
    return this.eventService.subscribe(member, +eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unsubscribe/:id')
  async remove(@Param('id') id: string, @User() account: Account) {
    const event = await this.eventService.findOne(+id);
    const member = await this.memberService.findOneByAccount(account);
    const sign = await this.memberToEventRepository.findOne({
      where: {
        event: event,
        member: member.memberToEvent,
      },
      relations: { member: true, event: true },
    });
    if (!sign) {
      throw new NotFoundException('Запись не найдена!');
    }
    return this.eventService.unSubscribe(sign, event);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Post('upload/:id')
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<FileElementResponce[]> {
    if (!file) {
      throw new BadRequestException('Нет загружаемого файла!');
    }
    const event = await this.eventService.findOne(+id);
    if (!event) {
      throw new NotFoundException('Нет такого мероприятия!');
    }
    const res = await this.filesService.saveFiles([file], event);
    const image = res.find((item) => item.name == file.originalname);
    this.eventService.addImage(event.id, image.url);
    return res;
  }
}
