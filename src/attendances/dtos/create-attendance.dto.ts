import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString(
    { strict: true },
    { message: 'date must be in this format YYYY-MM-DD' },
  )
  date: string;
}
