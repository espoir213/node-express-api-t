import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

@Entity('detail-vehicule')
export class DetailVehiculeEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_detail_vehicule' })
  idDetailVehicule: number;

  @Column({ name: 'marque' })
  @IsNotEmpty()
  marque: string;

  @Column({ name: 'model' })
  @IsNotEmpty()
  model: string;

  @Column({ name: 'numero' })
  @IsNotEmpty()
  numero: string;

  @Column({ name: 'VIN' })
  @IsNotEmpty()
  vin: string;

  @Column({ name: 'moteur' })
  @IsNotEmpty()
  moteur: string;

  @Column({ name: 'kilometrage' })
  @IsNotEmpty()
  kilometrage: string;

  @Column({ name: 'unite_kilometrage' })
  @IsNotEmpty()
  uniteKilometrage: string;

  @Column({ name: 'couleur' })
  @IsNotEmpty()
  couleur: string;

  @Column({ name: 'date_assurance' })
  @IsNotEmpty()
  dateAssurance: string;

  @Column({ name: 'campagnie_assurance' })
  @IsNotEmpty()
  campagnieAssurance: string;

  @Column({ name: 'date_entre' })
  @IsNotEmpty()
  dateEntre: string;

  @Column({ name: 'heure_entre' })
  @IsNotEmpty()
  heureEntre: string;

  @Column({ name: 'details_remarque' })
  @IsNotEmpty()
  details: string;
}
