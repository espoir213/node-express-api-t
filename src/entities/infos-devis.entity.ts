import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { DevisEntity } from './devis.entity';

@Entity('infos_devis')
export class InfosDevisEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_infos_devis' })
  idInfosDevis: number;

  @Column()
  @IsNotEmpty()
  quantite: number;

  @Column({ name: 'cout_unite' })
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
  @ManyToOne(() => DevisEntity, deiv => deiv.idDevis, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'devis_iddevis' })
  @IsNotEmpty()
  devis: DevisEntity;
}
