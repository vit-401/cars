import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {CarService} from './cars.service';
import {CreateCarDto} from './dto/create-car.dto';
import {UpdateCarDto} from "./dto/update-car.dto";
import {ObjectId} from "mongoose";
import {ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, getSchemaPath} from "@nestjs/swagger";
import {Car} from "./schema/car.schema";
import {PaginatedResponse} from './interfaces/PaginatedResponse'

@Controller('cars')
export class CarsController {
  constructor(private carService: CarService) {
  }

  @Get()
  @ApiOperation({summary: 'Retrieve a list of cars with pagination'})
  @ApiQuery({name: 'page', type: 'number', required: false, description: 'Page number', example: 1})
  @ApiQuery({name: 'limit', type: 'number', required: false, description: 'Number of items per page', example: 10})
  @ApiOkResponse({
    description: 'Successfully retrieved list of cars',
    schema: {
      allOf: [
        {$ref: getSchemaPath(PaginatedResponse)}, // Reference to the generic paginated response
        {
          properties: {
            data: {
              type: 'array',
              items: {$ref: getSchemaPath(Car)}, // Reference to your Car model
            },
            page: {type: 'number'},
            limit: {type: 'number'},
            totalPages: {type: 'number'},
            totalItems: {type: 'number'},
          },
        },
      ],
    },
  })
  findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
  ) {
    return this.carService.findAll(page, limit); // Ensure your service method returns the paginated response correctly
  }

  @Get(':id')
  @ApiOperation({summary: 'Retrieve a car by ID'})
  @ApiParam({name: 'id', type: 'string', description: 'ID of the car'})
  @ApiResponse({status: 200, type: Car})
  @ApiResponse({status: 404, description: 'Car not found'})
  findOne(@Param('id') id: ObjectId) {
    return this.carService.findOne(id);
  }

  @Post()
  @ApiOperation({summary: 'Create a new car'})
  @ApiBody({type: CreateCarDto})
  @ApiResponse({status: 201, type: Car})
  createOne(@Body() createCarDto: CreateCarDto) {
    return this.carService.createOne(createCarDto);
  }


  @Put(':id')
  @ApiOperation({summary: 'Update a car by ID'})
  @ApiParam({name: 'id', type: 'string', description: 'ID of the car'})
  @ApiBody({type: UpdateCarDto})
  @ApiResponse({status: 200, type: Car})
  @ApiResponse({status: 404, description: 'Car not found'})
  update(@Param('id') id: ObjectId, @Body() createCarDto: UpdateCarDto) {
    return this.carService.update(id, createCarDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a car by ID'})
  @ApiParam({name: 'id', type: 'string', description: 'ID of the car'})
  @ApiResponse({status: 200, description: 'Deleted successfully. Return Boolean', type: 'boolean'})
  @ApiResponse({status: 404, description: 'Car not found'})
  deleteOne(@Param('id') id: ObjectId) {
    return this.carService.deleteOne(id)
  }
}