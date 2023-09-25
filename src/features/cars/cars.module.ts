import {applyDecorators, Module, Type} from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarService } from './cars.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schema/car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  ],
  controllers: [CarsController],
  providers: [CarService],
})
export class CarsModule {}


