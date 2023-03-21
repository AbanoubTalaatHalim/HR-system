import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';
import { EmployeeTypeEnum } from './enums/employee-type.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}
  async getAllUsers() {
    return await this.usersRepository.findAllUsers();
  }
  async getUserById(id: string) {
    return await this.usersRepository.findOneByCriteria({ id: id });
  }
  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneByCriteria({ email: email });
  }
  async deleteUserById(id: string) {
    return await this.usersRepository.deleteUserByCriteria({ id: id });
  }
  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUser(createUserDto);
  }
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    return await this.usersRepository.createHr(email, password);
  }
  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneByCriteria({
      where: { email: email },
      select: ['password', 'email', 'salt', 'type'],
    });
    console.log(user);
    if (
      user &&
      user.type == EmployeeTypeEnum.HR &&
      (await user.validatePassword(password))
    ) {
      return user.email;
    } else {
      return null;
    }
  }
}
