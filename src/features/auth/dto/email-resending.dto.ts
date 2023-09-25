import {ApiProperty} from "@nestjs/swagger";

export class EmailResendingDto {
  @ApiProperty()
  email: string;
}
