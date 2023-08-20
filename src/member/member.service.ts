import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { MEMBER_NOT_FOUND_ERROR } from 'src/constants/exception.constants';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private accountService: AccountService,
  ) {}
  async create(createMemberDto: CreateMemberDto, accountId: number) {
    const account = await this.accountService.findOne(accountId);
    const newMember = this.memberRepository.create({
      ...createMemberDto,
      account,
    });
    return this.memberRepository.save(newMember);
  }

  async findAll() {
    const members = await this.memberRepository.find();
    if (!members.length) {
      throw new NotFoundException(MEMBER_NOT_FOUND_ERROR);
    }
    return members;
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new NotFoundException(MEMBER_NOT_FOUND_ERROR);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException(MEMBER_NOT_FOUND_ERROR);
    }
    return this.memberRepository.save({ ...member, ...updateMemberDto });
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException(MEMBER_NOT_FOUND_ERROR);
    }
    return this.memberRepository.remove(member);
  }
}
