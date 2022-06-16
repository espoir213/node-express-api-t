import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { InfosDevisEntity } from './infos-devis.entity';
import { ProjetEntity } from './projet.entity';

@Entity('devis')
export class DevisEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_devis' })
  idDevis: number;

  @Column({ name: 'details', type: 'longtext' })
  details: string;

  @Column()
  @IsNotEmpty()
  total: number;

  @Column({ name: 'sous_total' })
  @IsNotEmpty()
  sousTotal: number;

  @Column()
  @IsNotEmpty()
  impot: number;

  /**
   * relation projet
   */
  @ManyToOne(() => ProjetEntity, proj => proj.idProjet, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'projet_idprojet' })
  @IsNotEmpty()
  projets: ProjetEntity;

  @OneToMany(() => InfosDevisEntity, rem => rem.devis)
  infosDevis: InfosDevisEntity[];
}
