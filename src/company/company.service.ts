import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMPANY_NOT_FOUND_ERROR } from 'src/constants/exception.constants';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    const newCompany = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(newCompany);
  }

  async findAll() {
    const company = await this.companyRepository.find();
    if (!company.length) {
      throw new NotFoundException(COMPANY_NOT_FOUND_ERROR);
    }
    return company;
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(COMPANY_NOT_FOUND_ERROR);
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException(COMPANY_NOT_FOUND_ERROR);
    }
    return this.companyRepository.save({ ...company, ...updateCompanyDto });
  }

  async remove(id: number) {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException(COMPANY_NOT_FOUND_ERROR);
    }
    return this.companyRepository.remove(company);
  }
}
