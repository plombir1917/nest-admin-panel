import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  place: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
