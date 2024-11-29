import { IsString, IsEmail, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @Min(0)
  age: number;
}
