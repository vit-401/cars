import { ApiProperty } from '@nestjs/swagger';


export class CreateCarDto {
  @ApiProperty()
  brand: string;

  @ApiProperty()
  car_number: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  engine_type: string;
}