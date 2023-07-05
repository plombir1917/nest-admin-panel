import { IsDate, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;
  @IsString()
  place: string;
  @IsString()
  description: string;
  @IsDate()
  date: Date;
}
