import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public password: string;

  @IsString()
  public membres: number;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public email: string;
}
