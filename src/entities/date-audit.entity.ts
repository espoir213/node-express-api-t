import { BaseEntity, BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateAuditEntity extends BaseEntity {
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
