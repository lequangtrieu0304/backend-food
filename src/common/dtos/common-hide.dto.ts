import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserIdHideDto {
  @ApiHideProperty()
  @IsOptional()
  createdBy?: string;

  @ApiHideProperty()
  @IsOptional()
  updatedBy?: string;
}
