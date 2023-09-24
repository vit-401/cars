import {ApiProperty} from "@nestjs/swagger";

export class UpdateCarDto {
  @ApiProperty()
  brand: string;

  @ApiProperty()
  car_number: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  engine_type: string;
}