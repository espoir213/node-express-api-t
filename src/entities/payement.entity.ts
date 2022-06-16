import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { FactureEntity } from './facture.entity';

@Entity('payement')
export class PayementEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_Payement' })
  idPayement: number;

  @Column({ name: 'nontant' })
  @IsNotEmpty()
  montant: number;

  @Column({ name: 'noter', type: 'longtext' })
  @IsNotEmpty()
  note: string;

  @Column({ type: 'date', name: 'date_paiement' })
  datePaiement: Date;

  @Column({ name: 'mode_payement' })
  modePayement: string;

  @Column({ name: 'status', type: 'boolean', default: true })
  satuts: boolean;

  /**
   * relation Facture
   */
  @ManyToOne(() => FactureEntity, fact => fact.idFacture, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'facture_idfacture' })
  @IsNotEmpty()
  factures: FactureEntity;
}
