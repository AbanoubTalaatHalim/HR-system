import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { Attendance } from './entities/attendances.entity';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('attendances')
@ApiTags('attendances')
@UseGuards(JwtAuthGuard)
export class AttendancesController {
  constructor(private attendancesService: AttendancesService) {}

  @Get()
  getTasks(): Promise<Attendance[]> {
    return this.attendancesService.getAllAttendance();
  }

  @Get('/:userId')
  async getAllAttendancesByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Attendance[]> {
    return await this.attendancesService.getAllAttendancesFromUser(userId);
  }

  @Post()
  createAttendance(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendancesService.createAttendance(createAttendanceDto);
  }
}
