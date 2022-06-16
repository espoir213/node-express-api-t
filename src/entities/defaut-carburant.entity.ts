import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

@Entity('defaut_carburant_vehicule')
export class DefautCarburantEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_defaut_carburant' })
  idDefautCarburant: number;

  @Column({ name: 'pre_accident', type: 'longtext' })
  preAccident: string;

  @Column({ name: 'niveau_carburant' })
  niveauCarburant: string;

  @Column({ name: 'travaux_demmander', type: 'longtext' })
  travauxDemmander: string;
}
