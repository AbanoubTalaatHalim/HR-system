import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { EmployeeTypeEnum } from '../enums/employee-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsEmail()
  @Transform((param) => param.value?.trim().toLowerCase())
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(15)
  username: string;

  @IsString()
  @ApiProperty()
  @IsEnum(EmployeeTypeEnum)
  type: EmployeeTypeEnum;

  @IsString()
  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
