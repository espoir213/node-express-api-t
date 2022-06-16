import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

// roles Membre
export enum typeDest {
  tousClient = 'Tous les clients',
  selectClient = 'Clients sélectionnés',
  tousMembre = "Tous les membres de l'équipe",
  selectMembre = "Membres de l'équipe sélectionnés",
  manuellement = 'Entrer le numéro manuellement',
  clientMarque = 'Clients filtrés par marque / modèle de voiture',
}

//// roles Membre
export enum StatusCampagne {
  complete = 'Complété',
  cancel = 'annuler',
}

@Entity('campagne')
export class CampagneEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idCampagne: number;

  @Column()
  @IsNotEmpty()
  titleCampagne: string;

  @Column({ type: 'longtext' })
  @IsNotEmpty()
  message: string;

  @Column({ type: 'longtext' })
  personSelected: string;

  @Column({ type: 'enum', enum: typeDest, default: typeDest.tousClient })
  sendTo: typeDest;

  @Column({ type: 'enum', enum: StatusCampagne, default: StatusCampagne.complete })
  satus: StatusCampagne;

  @Column()
  telephone: string;
}
