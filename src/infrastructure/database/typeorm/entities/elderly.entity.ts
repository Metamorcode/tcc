import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('elderlies')
export class ElderlyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'timestamp' })
  birthDate: Date;

  @Column()
  userFamily?: string;

  @OneToMany(() => TaskEntity, (task) => task.elderly, {
    cascade: true,
    eager: true,
  })
  tasks: TaskEntity[];
}
