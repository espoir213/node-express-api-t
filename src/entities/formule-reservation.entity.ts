import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { UserEntity } from './user.entity';

@Entity('formule-reservation')
export class FormuleReservationEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idFormuleReservation: number;

  @Column({ name: 'formule_reservation_vehicule' })
  formuleReservationVehicule: string;

  @Column({ name: 'formule_avis', type: 'longtext' })
  avisFormule: string;

  @Column({ name: 'avis_non_responsable', type: 'longtext' })
  avisNonResponsable: string;

  @Column({ name: 'terme_condition', type: 'longtext' })
  termeCondition: string;

  @Column({ name: 'active_diagramme', default: false })
  activeDiagramme: boolean;

  @OneToOne(() => UserEntity, user => user.idUser, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_iduser' })
  @IsNotEmpty()
  @Unique(['string'])
  users: UserEntity;
}
