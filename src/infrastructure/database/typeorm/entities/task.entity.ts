import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ElderlyEntity } from './elderly.entity';
import { CategoryEntity } from './category.entity';
import { MedicineEntity } from './medicine.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  eventTime: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.tasks, { eager: true }) 
  @JoinColumn({ name: 'category_id' }) 
  category: CategoryEntity;

  @Column()
  repeatFor: number;

  @Column({ default: false }) 
  completed: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => ElderlyEntity, (elderly) => elderly.tasks) 
  @JoinColumn({ name: 'elderly_id' })
  elderly: ElderlyEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks) 
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
