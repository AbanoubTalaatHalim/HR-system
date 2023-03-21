import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attendance } from 'src/attendances/entities/attendances.entity';
import { User } from 'src/users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '5678',
  database: 'hrmanagement',
  entities: [User, Attendance],
  synchronize: true,
};
