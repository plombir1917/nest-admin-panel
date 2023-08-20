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
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/decorators/account.decorator';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createMemberDto: CreateMemberDto, accountId: number) {
    return this.memberService.create(createMemberDto, accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Account() id: number) {
    console.log(id);
    return this.memberService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
