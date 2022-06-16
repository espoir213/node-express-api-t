import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

@Entity('assurances')
export class AssuranceEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_assurance' })
  idAssurance: number;

  @Column({ name: 'telephone_assurance' })
  @IsNotEmpty()
  telephoneAssurance: string;

  @Column({ name: 'nom_assurance' })
  @IsNotEmpty()
  nomAssurance: string;
}
