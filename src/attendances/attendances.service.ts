import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dtos/create-attendance.dto';
import { Attendance } from './entities/attendances.entity';
import { AttendanceRepository } from './attendances.repository';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(AttendanceRepository)
    private attendancesRepository: AttendanceRepository,
    private usersService: UsersService,
  ) {}

  async getAllAttendance(): Promise<Attendance[]> {
    return this.attendancesRepository.findAttendancesByCriteria({});
  }

  async getAllAttendancesFromUser(userId: string): Promise<Attendance[]> {
    const user = await this.usersService.getUserById(userId);
    const found = await this.attendancesRepository.findAttendancesByCriteria({
      where: { user: user },
    });
    if (!found) {
      throw new NotFoundException(
        `no attendances found for this user ${user.username}`,
      );
    }
    return found;
  }

  async createAttendance(
    createTAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    const { date, userId } = createTAttendanceDto;
    const user = await this.usersService.getUserById(userId);
    return this.attendancesRepository.createAttendance(date, user);
  }
}
