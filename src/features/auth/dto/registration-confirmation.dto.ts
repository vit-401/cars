import {ApiProperty} from "@nestjs/swagger";

export class RegistrationConfirmationDto {
  @ApiProperty()
  code: string;
}
