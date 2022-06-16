import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idRefreshToken: number;

  @Column()
  token: string;
}
