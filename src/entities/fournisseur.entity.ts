import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateAuditEntity } from './date-audit.entity';

@Entity('fournisseur')
export class FournisseurEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  idFournisseur: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  nom: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 20)
  telephone: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 80)
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 20)
  adresse: string;

  @Column({ name: 'nip_tva' })
  @IsNotEmpty()
  @Length(1, 20)
  nipTVA: string;

  @Column('boolean', { default: false })
  status: boolean;
}
