import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}
  async create(account: CreateMemberDto) {
    const newMember = this.memberRepository.create({ ...account, account });
    const existMember = await this.memberRepository.findOne({
      where: {
        account: newMember.account,
      },
    });
    if (existMember) {
      throw new BadRequestException('Такой участник уже существует!');
    }
    return this.memberRepository.save(newMember);
  }

  async findAll() {
    const members = await this.memberRepository.find({
      relations: { account: true },
    });
    if (!members.length) {
      throw new NotFoundException('Участник не найден');
    }
    return members;
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOne({
      where: { id: id },
      relations: { account: true },
    });
    if (!member) {
      throw new NotFoundException('Участник не найден');
    }
    return member;
  }

  async findOneByAccount(account: Account) {
    const member = await this.memberRepository.findOne({
      where: { email: account.email },
      relations: { account: true },
    });
    // if (!member) {
    //   throw new NotFoundException('Участник не найден');
    // }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('Участник не найден');
    }
    return this.memberRepository.save({ ...member, ...updateMemberDto });
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('Участник не найден');
    }
    return this.memberRepository.remove(member);
  }
}
