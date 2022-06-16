import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { UserEntity } from './user.entity';

@Entity('info_societe_user')
export class InfoSocieteEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idInfoSociete: number;

  @Column({ name: 'nom_entreprise' })
  nomEntreprise: string;

  @Column({ name: 'logo_entreprise' })
  logoEntreprise: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'telephone' })
  telephone: string;

  @Column({ name: 'adresse' })
  adresse: string;

  @Column({ name: 'ville' })
  ville: string;

  @Column({ name: 'pays' })
  pays: string;

  @Column({ name: 'fuseau_horaire' })
  fuseauHoraire: string;

  @Column({ name: 'monnaie' })
  monnaie: string;

  @Column({ name: 'broche_KRA' })
  brocheKRA: string;

  @Column({ name: 'taxe_pourcentage', type: 'decimal' })
  taxe: number;

  @Column({ name: 'datail_payement', type: 'longtext' })
  detailPayement: string;

  @Column({ name: 'clause', type: 'longtext' })
  clause: string;

  @Column({ name: 'citations', type: 'longtext' })
  citations: string;

  @Column({ default: false, name: 'send_email' })
  sendEmail: boolean;

  @Column({ default: false, name: 'reparation' })
  reparation: boolean;

  @Column({ default: false, name: 'ajout_pices_dependance' })
  ajoutPiece: boolean;

  @Column({ default: false, name: 'info_tache_vehicule' })
  tacheVehiculeInfo: boolean;

  @Column({ default: false, name: 'info_vehicule' })
  vehiculeInfo: boolean;

  @Column({ default: false, name: 'active_restreindre' })
  activeRestreindre: boolean;

  @Column({ default: false, name: 'active_signatures_facture' })
  activeSignaturesFacture: boolean;

  @Column({ default: false, name: 'active_signatures_devis' })
  activeSignaturesDevis: boolean;

  @OneToOne(() => UserEntity, user => user.idUser, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_iduser' })
  @IsNotEmpty()
  @Unique(['string'])
  users: UserEntity;
}
