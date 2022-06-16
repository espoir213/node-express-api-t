import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { FactureEntity } from './facture.entity';

@Entity('infos_facture')
export class InfosFactureEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_infos_Facture' })
  idInfosFacture: number;

  @Column()
  @IsNotEmpty()
  quantite: number;

  @Column({ name: 'cout_unites' })
  @IsNotEmpty()
  coutUnite: number;

  @Column()
  @IsNotEmpty()
  impot: number;

  @Column()
  @IsNotEmpty()
  total: number;

  @Column({ type: 'longtext' })
  @IsNotEmpty()
  description: string;

  /**
   * relation projet
   */
  @ManyToOne(() => FactureEntity, fact => fact.idFacture, {
    eager: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'factures_idFactures' })
  @IsNotEmpty()
  factures: FactureEntity;
}
