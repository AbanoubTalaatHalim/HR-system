import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmployeeTypeEnum } from './enums/employee-type.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createHr(email: string, password: string) {
    const hr = new User();
    hr.username = email.split('@')[0];
    hr.type = EmployeeTypeEnum.HR;
    hr.email = email;
    hr.salt = await bcrypt.genSalt();
    hr.password = await this.hashPassword(password, hr.salt);
    try {
      await hr.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password, email, type } = createUserDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.type = type;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
  async findAllUsers() {
    return await this.find();
  }
  async findOneByCriteria(criteria: Record<string, any>) {
    const user = await this.findOne(criteria);
    if (!user)
      throw new NotFoundException({
        wrongEmail: 'no user found with this search criteria',
      });
    return user;
  }
  async deleteUserByCriteria(criteria: Record<string, any>) {
    const user = await this.findOneByCriteria(criteria);
    return await this.delete(user);
  }
}
