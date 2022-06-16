import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { RemarqueProjetEntity } from './remarque-projet.entity';
import { VehiculeEntity } from './vehicule.entity';

//// Status projet
export enum StatusProjet {
  enCours = 'En cours',
  releve = 'Réservé dans',
  complete = 'Complété',
  annuler = 'Annulé',
}

//// Test routier
export enum TestRoutiers {
  rien = 'Rien',
  avecClient = 'Avec le client',
  avecClientMecanicien = 'Avec client et mécanicien',
}

@Entity('projets')
export class ProjetEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_projet' })
  idProjet: number;

  @ManyToOne(() => VehiculeEntity, veh => veh.idVehicule, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicule_idVehicule' })
  @IsNotEmpty()
  vehicules: VehiculeEntity;

  @Column({ type: 'date', name: 'date_debut' })
  dateDebut: Date;

  @Column({ type: 'date', name: 'date_fin' })
  dateFin: Date;

  @Column({ type: 'enum', enum: StatusProjet, default: StatusProjet.enCours })
  satus: StatusProjet;

  @Column({ type: 'enum', enum: TestRoutiers, default: TestRoutiers.rien })
  testRoutier: StatusProjet;

  @OneToMany(() => RemarqueProjetEntity, rem => rem.projets)
  remarques: RemarqueProjetEntity[];
}
