import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserRoles } from './user.role'; 

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
  })
  role: UserRoles;

  @OneToMany(() => TaskEntity, (task) => task.user, {
    cascade: true,
    eager: true,
  })
  tasks: TaskEntity[];
}
