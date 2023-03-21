import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Attendance } from '../../attendances/entities/attendances.entity';
import { EmployeeTypeEnum } from '../enums/employee-type.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: EmployeeTypeEnum,
    default: EmployeeTypeEnum.HR,
  })
  type: EmployeeTypeEnum;

  @Column({ select: false })
  salt: string;

  @OneToMany((type) => Attendance, (attendance) => attendance.user, {
    eager: false,
  })
  attendances: Attendance[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
