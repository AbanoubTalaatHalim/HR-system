import { EntityRepository } from 'typeorm';
import { Attendance } from './entities/attendances.entity';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Attendance)
export class AttendanceRepository extends Repository<Attendance> {
  async findAttendancesByCriteria(
    criteria: Record<string, any>,
  ): Promise<Attendance[]> {
    const attendances = this.find({ where: criteria });
    if (!attendances)
      throw new NotFoundException(
        'no attendances found with this search criteria',
      );
    return attendances;
  }

  async createAttendance(date: string, user: User): Promise<Attendance> {
    const attendance = new Attendance();
    attendance.date = new Date(date);
    attendance.user = user;
    await attendance.save();
    return attendance;
  }
}
