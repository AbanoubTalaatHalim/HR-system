import { createParamDecorator } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
