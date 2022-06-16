import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

@Entity('pieces_vehicule')
export class PieceVehiculeEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_defaut_carburant' })
  idPieceVehicule: number;

  @Column({ name: 'verification_pieces', type: 'longtext' })
  verificationPieces: string;

  @Column({ name: 'note_resevation', type: 'longtext' })
  noteReservation: string;
}
