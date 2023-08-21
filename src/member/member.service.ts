import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import {
  ALREADY_EXIST_ERROR,
  MEMBER_NOT_FOUND_ERROR,
} from 'src/constants/exception.constants';
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
  async create(account: CreateMemberDto) {
    const newMember = this.memberRepository.create({ ...account, account });
    const existMember = await this.memberRepository.findOne({
      where: {
        account: newMember.account,
      },
    });
    if (existMember) {
      throw new BadRequestException(ALREADY_EXIST_ERROR);
    }
    return this.memberRepository.save(newMember);
  }

  async findAll() {
    const members = await this.memberRepository.find({
      relations: { account: true },
    });
    if (!members.length) {
      throw new NotFoundException(MEMBER_NOT_FOUND_ERROR);
    }
    return members;
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOne({
      where: { id: id },
      relations: { account: true },
    });
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
