import {Injectable} from '@nestjs/common';
import {CreateCarDto} from './dto/create-car.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {Car, CarDocument} from './schema/car.schema';
import {UpdateCarDto} from "./dto/update-car.dto";
import {PaginatedResponse} from "./interfaces/PaginatedResponse";

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
  ) {
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResponse<Car>> {
    const skip = (page - 1) * limit;

    // Find the cars and count them at the same time
    const [data, totalItems] = await Promise.all([
      this.carModel.find().skip(skip).limit(limit).exec(),
      this.carModel.countDocuments()
    ]);

    // Construct the paginated response
    const response: PaginatedResponse<Car> = {
      data,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit) || 1,
      totalItems
    };

    return response;
  }

  async findOne(id: ObjectId): Promise<Car | null> {
    const car = await this.carModel.findOne({_id: id})
    return car ?? null
  }

  async createOne(createCarDto: CreateCarDto): Promise<Car> {
    const car = new this.carModel(createCarDto);
    return car.save();
  }

  // async createMore(createCarDtos: CreateCarDto[]): Promise<Car[]> {
  //   const cars = createCarDtos.map(async (dto) => {
  //     const car = new this.carModel(dto);
  //     return car.save();
  //   });
  //   return Promise.all(cars);
  // }

  async deleteOne(id: ObjectId): Promise<Boolean> {
    const result = await this.carModel.deleteOne({_id: id});
    return result.deletedCount === 1;
  }

  async update(id: ObjectId, updateCarDto: UpdateCarDto): Promise<Car> {
    const result = await this.carModel.findByIdAndUpdate({_id: id}, updateCarDto)
    return  result
  }
}