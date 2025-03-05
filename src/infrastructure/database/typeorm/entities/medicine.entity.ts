import { Entity, Column } from 'typeorm';
import { TaskEntity } from './task.entity';
import { MedicineUnit } from './medicine.unit'; // Importando a classe MedicineUnit

@Entity('medicines')
export class MedicineEntity extends TaskEntity {
  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  unit: MedicineUnit;
}
