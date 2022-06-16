import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { FournisseurEntity } from './fournisseur.entity';

@Entity('inventaire')
export class InventaireEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_inventaire' })
  idInventaire: number;

  @Column({ name: 'nom_article' })
  @IsNotEmpty()
  @Length(1, 80)
  nomArticle: string;

  @Column()
  @IsNotEmpty()
  quantite: number;

  @Column({ name: 'quantite_reapprovisionnement' })
  @IsNotEmpty()
  quantiteReapro: number;

  @Column({ name: 'cout_unitaire' })
  @IsNotEmpty()
  coutUnitaire: number;

  @Column({ name: 'code_article' })
  @IsNotEmpty()
  @Length(1, 80)
  codeArticle: string;

  @Column({ name: 'numero_etagere' })
  @IsNotEmpty()
  @Length(1, 80)
  numeroEtagere: string;

  @Column({ name: 'unite_qt' })
  @IsNotEmpty()
  @Length(1, 80)
  uniteQt: string;

  @ManyToOne(() => FournisseurEntity, f => f.idFournisseur, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fournisseur_idFournisseur' })
  @IsNotEmpty()
  fournisseurs: FournisseurEntity;
}
