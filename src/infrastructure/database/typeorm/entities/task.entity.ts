import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ElderlyEntity } from './elderly.entity';
import { CategoryEntity } from './category.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  eventTime: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.tasks)
  category: CategoryEntity;

  @Column()
  repeatFor: number;

  @Column()
  completed: boolean;

  @ManyToOne(() => ElderlyEntity, (elderly) => elderly.tasks)
  elderly: ElderlyEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  user_id: string;
}

