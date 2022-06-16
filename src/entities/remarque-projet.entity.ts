import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { ProjetEntity } from './projet.entity';

@Entity('remaque-projet')
export class RemarqueProjetEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_remarque' })
  idRemarque: number;

  @Column({ name: 'text_remarque', type: 'longtext' })
  @IsNotEmpty()
  text: string;

  /**
   * relation Projet
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
}
