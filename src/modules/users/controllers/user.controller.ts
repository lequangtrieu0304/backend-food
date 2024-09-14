import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '@modules/users/services/user.service';
import { UserDto, UserLoginDto } from '@modules/users/dtos/user.dto';
import { UserDoc, UserEntity } from '@modules/users/entities/user.entity';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  ApiCreateOperation,
  ApiListOperation,
  ApiPaginatedResponse,
} from '@common/swagger/swagger.decorator';
import { PaginatedResult } from '@common/api.schema';

@ApiTags('User')
@ApiExtraModels()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiListOperation()
  @Get()
  @ApiPaginatedResponse(UserEntity)
  async list(@Query() query: any): Promise<PaginatedResult<UserEntity>> {
    return this.userService.findAll<UserEntity>(query);
  }

  @ApiCreateOperation()
  @Post()
  async create(@Body() body: UserDto) {
    return this.userService.create<UserEntity>(body);
  }

  @ApiCreateOperation({ summary: 'Login' })
  @Post('/login')
  async login(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }
}
