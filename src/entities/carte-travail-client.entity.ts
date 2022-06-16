import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { ProjetEntity } from './projet.entity';

//// Status carte travail
export enum StatusCarteTravail {
  evauler = 'Evaluer',
  approuver = 'Approuver',
}

@Entity('carte_travail_client')
export class CarteTravailClientEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_carte_travail_client' })
  idCarteTravailClient: number;

  @Column({ name: 'rapport_corporel', type: 'longtext' })
  rapportCorporel: string;

  @Column({ name: 'rapport_mecanique', type: 'longtext' })
  rapportMecanique: string;

  @Column({ name: 'rapport_electrique', type: 'longtext' })
  rapportElectrique: string;

  @Column({ type: 'enum', enum: StatusCarteTravail, default: StatusCarteTravail.evauler })
  satus: StatusCarteTravail;

  /**
   * relation projet
   */
  @ManyToOne(() => ProjetEntity, pro => pro.idProjet, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'projet_idprojet' })
  @IsNotEmpty()
  projets: ProjetEntity;
}
