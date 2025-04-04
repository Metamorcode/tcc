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

  @Column()
  birthDate: Date;

  @OneToMany(() => TaskEntity, (task) => task.elderly, {
    cascade: true,
    eager: true,
  })
  tasks: TaskEntity[];
}
