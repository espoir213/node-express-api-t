import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

@Entity('porteur_vehicule')
export class PorteurVehiculeEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idPorteurVehicule: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  nomPrenom: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 20)
  telephone: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  email: string;
}
