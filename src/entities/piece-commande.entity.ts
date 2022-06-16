import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

// Status piece
export enum StatusPieces {
  active = 'Activé',
  nonActive = 'Non Activé',
}
@Entity('piece_a_commande')
export class PieceCommandeEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_piece' })
  idPiece: number;

  @Column({ name: 'nom_piece' })
  @IsNotEmpty()
  nomPiece: string;

  @Column({ name: 'nom_entree_piece' })
  nomEntree: string;

  @Column({ type: 'enum', enum: StatusPieces, default: StatusPieces.active })
  status: StatusPieces;
}
