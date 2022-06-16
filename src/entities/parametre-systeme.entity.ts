import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { UserEntity } from './user.entity';

@Entity('parametre_systeme')
export class ParametreSystemeEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idParametreSysteme: number;

  @Column({ name: 'name_systeme' })
  nameSysteme: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'key_api' })
  keyAPI: string;

  @Column({ name: 'id_serveur' })
  idServeur: string;

  @Column({ name: 'user_name_smtp' })
  userNameSMTP: string;

  @Column({ name: 'from_email_smtp' })
  fromEmail: string;

  @Column({ name: 'hotesse_smtp' })
  hostSMTP: string;

  @Column({ name: 'password_smtp' })
  passwordSMTP: string;

  @Column({ name: 'port_smtp' })
  portSMTP: string;

  @Column({ name: 'encryption_smtp' })
  encryptionSMTP: string;

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
