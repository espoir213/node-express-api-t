import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsEmail()
  public email: string;

  @IsString()
  nomPrenom: string;

  @IsString()
  telephone: string;

  @IsString()
  adresse: string;
}

export class UpdateClientDto extends CreateClientDto {
  @IsBoolean()
  status: boolean;
}
