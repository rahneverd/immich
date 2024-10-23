import { SessionEntity } from 'src/entities/session.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('session_sync_states')
export class SessionSyncStateEntity {
  @OneToOne(() => SessionEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  session?: SessionEntity;

  @PrimaryColumn()
  sessionId!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  assets!: string;

  @Column({ type: 'timestamptz', nullable: true })
  albums!: string;

  @Column({ type: 'timestamptz', nullable: true })
  albumAssets!: string;

  @Column({ type: 'timestamptz', nullable: true })
  albumUsers!: string;

  @Column({ type: 'timestamptz', nullable: true })
  activities!: string;

  @Column({ type: 'timestamptz', nullable: true })
  memories!: string;

  @Column({ type: 'timestamptz', nullable: true })
  partners!: string;

  @Column({ type: 'timestamptz', nullable: true })
  people!: string;

  @Column({ type: 'timestamptz', nullable: true })
  sharedLinks!: string;

  @Column({ type: 'timestamptz', nullable: true })
  stacks!: string;

  @Column({ type: 'timestamptz', nullable: true })
  tags!: string;

  @Column({ type: 'timestamptz', nullable: true })
  users!: string;
}
