import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}
  create(createMemberDto: CreateMemberDto) {
    const newMember = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(newMember);
  }

  findAll() {
    return this.memberRepository.find();
  }

  findOne(id: number) {
    return this.memberRepository.findOneBy({ id });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id);
    return this.memberRepository.save({ ...member, ...updateMemberDto });
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    return this.memberRepository.remove(member);
  }
}
