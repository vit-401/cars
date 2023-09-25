import { Length, Matches } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RegistrationDto {
  @ApiProperty()
  @Length(3, 30)
  login: string;

  @ApiProperty()
  @Length(3, 30)
  password: string;

  @ApiProperty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;
}
