import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('/:userId')
  async getUserById(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.usersService.getUserById(userId);
  }

  @Delete('/:userId')
  async deleteUserById(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.usersService.deleteUserById(userId);
  }
}
