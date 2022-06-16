import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AssuranceEntity } from './assurances.entity';
import { ClientEntity } from './client.entity';
import { DateAuditEntity } from './date-audit.entity';
import { DefautCarburantEntity } from './defaut-carburant.entity';
import { DetailVehiculeEntity } from './details-vehicule.entity';
import { PieceVehiculeEntity } from './pieces-vehicule.entity';
import { PorteurVehiculeEntity } from './porteur-veicule.entity';

@Entity('vehicule')
export class VehiculeEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_vehicule' })
  idVehicule: number;

  @Column()
  @IsNotEmpty()
  photo: string;

  @Column({ default: false })
  isPorteur: boolean;

  @Column({ default: false })
  isAssurance: boolean;

  /**
   * relation client
   */
  @ManyToOne(() => ClientEntity, cli => cli.idClient, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_idClient' })
  @IsNotEmpty()
  clients: ClientEntity;

  /**
   * relation porteurVehicule
   */
  @ManyToOne(() => PorteurVehiculeEntity, port => port.idPorteurVehicule, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'porteur_idPourteur' })
  @IsNotEmpty()
  porteurVehicule: PorteurVehiculeEntity;

  /**
   * relation assurance
   */
  @ManyToOne(() => AssuranceEntity, ass => ass.idAssurance, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'assurance_idAssurance' })
  @IsNotEmpty()
  assurances: AssuranceEntity;

  /**
   * relation defaut Carburant
   */
  @ManyToOne(() => DefautCarburantEntity, defCarb => defCarb.idDefautCarburant, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'defautCarburant_idDefautCarburant' })
  @IsNotEmpty()
  defautCarburants: DefautCarburantEntity;

  /**
   * relation defaut piece vehicule
   */
  @ManyToOne(() => PieceVehiculeEntity, piceVeh => piceVeh.idPieceVehicule, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PieceVehicule_idPieceVehicule' })
  @IsNotEmpty()
  pieceVehicules: PieceVehiculeEntity;

  /**
   * relation details vehicule
   */
  @ManyToOne(() => DetailVehiculeEntity, detailVeh => detailVeh.idDetailVehicule, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'DetailVehicule_idDetailVehicule' })
  @IsNotEmpty()
  detailVehicules: DetailVehiculeEntity;
}
