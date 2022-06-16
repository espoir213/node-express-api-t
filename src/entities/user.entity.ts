import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { MembreEntity } from './membre.entity';

@Entity('user')
export class UserEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({
    length: 80,
  })
  @IsNotEmpty()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @OneToOne(() => MembreEntity, membre => membre.idMembre, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'membre_idmembre' })
  @IsNotEmpty()
  @Unique(['string'])
  membres: MembreEntity;
}
