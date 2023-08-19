import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  description!: string;
  title!: string;
}

export class CreateTaskV2Dto extends CreateTaskDto {
  @IsString()
  @Transform(({ value }) => value.replace(/\[.*?\]/, ''))
  jiraId!: string;
}
