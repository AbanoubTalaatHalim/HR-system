import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  date: Date;

  @ManyToOne((type) => User, (user) => user.attendances, { eager: true })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
