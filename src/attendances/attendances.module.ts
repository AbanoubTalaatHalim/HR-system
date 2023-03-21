import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendances.entity';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { UsersModule } from 'src/users/users.module';
import { AttendanceRepository } from './attendances.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRepository]), UsersModule],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
