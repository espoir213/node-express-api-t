import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

// roles Membre
export enum RoleMembre {
  admin = 'Admin',
  personnelle = 'Personnelle',
  resposableRes = 'Responsable des réservations',
  gestionnaire = "Gestionnaire d'inventaire",
  proprietaire = 'Propriétaire',
}

// StatusMembre Membre
export enum StatusMembre {
  active = 'Active',
  enConge = 'En congé',
  indisponible = 'Indisponible',
}

// TaperMembre Membre
export enum TaperMembre {
  pleinTemp = 'À plein temps',
  partiel = 'À temps partiel',
  sousTraitant = 'Sous-traitant',
}

@Entity('membre')
export class MembreEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idMembre: number;

  @Column({
    length: 80,
  })
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column({
    length: 45,
  })
  @IsNotEmpty()
  prenom: string;

  @Column({
    length: 45,
  })
  @IsNotEmpty()
  nom: string;

  @Column({
    length: 45,
  })
  adresse: string;

  @Column({
    length: 20,
  })
  telephone: string;

  @Column({ type: 'enum', enum: RoleMembre, default: RoleMembre.personnelle })
  role: RoleMembre;

  @Column({ type: 'enum', enum: StatusMembre, default: StatusMembre.active })
  statut: StatusMembre;

  @Column({ type: 'enum', enum: TaperMembre, default: TaperMembre.sousTraitant })
  taper: TaperMembre;
}
