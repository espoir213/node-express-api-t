import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { InfosFactureEntity } from './infos-facture.entity';
import { ProjetEntity } from './projet.entity';

//// status facture
export enum StatusFacture {
  payer = 'Payé',
  partiel = 'Partiel',
  nonPayer = 'Non payé',
}
@Entity('facture')
export class FactureEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_facture' })
  idFacture: number;

  @Column({ name: 'remarque', type: 'longtext' })
  remarques: string;

  @Column()
  @IsNotEmpty()
  total: number;

  @Column({ name: 'sous_total' })
  @IsNotEmpty()
  sousTotal: number;

  @Column()
  @IsNotEmpty()
  impot: number;

  @Column({ type: 'date', name: 'date_facturation' })
  dateFacturation: Date;

  @Column({ type: 'date', name: 'date_paiement' })
  datePaiement: Date;

  @Column({ name: 'mode_payement', type: 'longtext' })
  modePayement: string;

  @Column({ name: 'reste_payer' })
  @IsNotEmpty()
  restePayer: number;

  /**
   * relation projet
   */
  @ManyToOne(() => ProjetEntity, proj => proj.idProjet, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'projet_idProjet' })
  @IsNotEmpty()
  projets: ProjetEntity;

  @Column({ type: 'enum', enum: StatusFacture, default: StatusFacture.nonPayer })
  status: StatusFacture;

  @OneToMany(() => InfosFactureEntity, rem => rem.factures)
  infosFactures: InfosFactureEntity[];
}
