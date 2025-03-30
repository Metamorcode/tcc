import { Entity, Column, ChildEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { TaskEntity } from './task.entity';
import { MedicineUnit } from './medicine.unit';

@Entity('medicines')
export class MedicineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;
  
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @Column({
    type: 'enum',
    enum: MedicineUnit,
  })
  unit: MedicineUnit;
}
