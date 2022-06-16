import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampagneEntity } from './campagne.entity';

@Entity('personne_has_campagne')
export class PersonneHasCampagneEntity extends BaseEntity {
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

  @Column({ name: 'telephone' })
  @IsNotEmpty()
  telephone: string;
}
