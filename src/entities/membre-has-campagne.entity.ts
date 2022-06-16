import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampagneEntity } from './campagne.entity';
import { MembreEntity } from './membre.entity';

@Entity('membre_has_campagne')
export class MembreHasCampagneEntity extends BaseEntity {
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

  @ManyToOne(() => MembreEntity, memb => memb.idMembre, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'membre_idcembre' })
  @IsNotEmpty()
  destinateur: MembreEntity;
}
