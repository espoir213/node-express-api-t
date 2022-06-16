import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from './client.entity';
import { DateAuditEntity } from './date-audit.entity';

@Entity('remaque-client')
export class RemarqueClientEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ name: 'id_remarque' })
  idRemarque: number;

  @Column({ name: 'text_remarque', type: 'longtext' })
  @IsNotEmpty()
  text: string;

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
}
