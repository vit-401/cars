import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Pagination } from '../../infrastructure/common/pagination.service';
import { BaseAuthGuard } from '../auth/guards/base-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() query) {
    const { page, pageSize, searchNameTerm } =
      Pagination.getPaginationData(query);
    const users = await this.usersService.getUsers(
      page,
      pageSize,
      searchNameTerm,
    );
    if (!users) throw new HttpException('Not found', 404);
    return users;
  }
  @UseGuards(BaseAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(
      createUserDto.login,
      createUserDto.password,
      createUserDto.email,
    );
    return createdUser;
  }
  @UseGuards(BaseAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.deleteUserById(id);
    return result;
  }
}
