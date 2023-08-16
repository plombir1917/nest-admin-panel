import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE_NOT_FOUND_ERROR } from 'src/constants/exception.constants';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private RoleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const newRole = this.RoleRepository.create(createRoleDto);
    return this.RoleRepository.save(newRole);
  }

  async getRoleByValue(value: string) {
    const role = await this.RoleRepository.findOneBy({ value });
    if (!role) {
      throw new NotFoundException(ROLE_NOT_FOUND_ERROR);
    }
    return role;
  }
}
