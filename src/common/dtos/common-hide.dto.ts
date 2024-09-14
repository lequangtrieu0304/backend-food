import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateHideDto {
  @ApiHideProperty()
  @IsOptional()
  _id?: string;

  @ApiHideProperty()
  @IsOptional()
  deleted?: boolean;
}
