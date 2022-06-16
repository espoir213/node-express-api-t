import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampagneEntity } from './campagne.entity';
import { ClientEntity } from './client.entity';

@Entity('client_has_campagne')
export class ClientHasCampagneEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CampagneEntity, camp => camp.idCampagne, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'campagne_idCampagne' })
  @IsNotEmpty()
  campagne: CampagneEntity;

  @ManyToOne(() => ClientEntity, cli => cli.idClient, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_idclient' })
  @IsNotEmpty()
  destinateur: ClientEntity;
}
