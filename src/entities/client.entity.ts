import { Client } from '@/interfaces/client.interface';
import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';
import { RemarqueClientEntity } from './remarque-client.entity';

@Entity('client')
export class ClientEntity extends DateAuditEntity implements Client {
  @PrimaryGeneratedColumn()
  idClient: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  nomPrenom: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 20)
  telephone: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  @Unique(['email'])
  email: string;

  @Column('boolean', { default: false })
  status: boolean;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  adresse: string;

  @OneToMany(() => RemarqueClientEntity, rem => rem.clients)
  remarques: RemarqueClientEntity[];
}
