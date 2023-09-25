import { Length, Matches } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  @Length(3, 30)
  login: string;

  @ApiProperty()
  @Length(3, 30)
  password: string;
  
}
