import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '@modules/users/services/user.service';
import { UserDto, UserLoginDto } from '@modules/users/dtos/user.dto';
import { UserEntity } from '@modules/users/entities/user.entity';
import { ApiExtraModels } from '@nestjs/swagger';
import {
  ApiCreateOperation,
  ApiListOperation,
  ApiOperation,
  ApiPaginatedResponse,
  ApiTagsAndBearer,
} from '@common/swagger/swagger.decorator';
import { PaginatedResult } from '@common/api.schema';
import { SkipAuth, UserAuth } from '@common/auth/jwts/jwt.decorator';

@ApiTagsAndBearer('User')
@ApiExtraModels()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'me' })
  @Get('me')
  getMe(@UserAuth() user: UserEntity): UserEntity {
    return user;
  }

  @ApiListOperation()
  @Get()
  @ApiPaginatedResponse(UserEntity)
  async list(@Query() query: any): Promise<PaginatedResult<UserEntity>> {
    return this.userService.findAll<UserEntity>(query);
  }

  @ApiCreateOperation()
  @Post()
  @SkipAuth()
  async signup(@Body() body: UserDto) {
    return this.userService.create<UserEntity>(body);
  }

  @ApiCreateOperation({ summary: 'Login' })
  @Post('/login')
  @SkipAuth()
  async login(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }
}
