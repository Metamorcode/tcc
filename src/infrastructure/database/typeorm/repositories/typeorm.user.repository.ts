import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../../../domain/application/repositories/user-repository';
import { User } from '../../../../domain/enterprise/entities/user';
import { UserEntity } from '../entities/user.entity';
import { TypeORMUserMapper } from '../mappers/typeorm.user.mapper';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(userProps: User): Promise<User> {
    const userEntity = TypeORMUserMapper.toTypeORM(userProps);
    const savedUser = await this.repository.save(userEntity);
    return TypeORMUserMapper.toDomain(savedUser);
  }

  async getById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!userEntity) {
      return null;
    }
    return TypeORMUserMapper.toDomain(userEntity);
  }

  async getFirstName(firstName: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { firstName },
    });
    return userEntity ? TypeORMUserMapper.toDomain(userEntity) : null;
  }

  async getLastName(lastName: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { lastName },
    });
    return userEntity ? TypeORMUserMapper.toDomain(userEntity) : null;
  }

  async update(user: User): Promise<User> {
    const userId = user.getId();

    if (!userId) {
      throw new Error('User ID is required');
    }

    const existingUser = await this.repository.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const userEntity = TypeORMUserMapper.toTypeORM(user);
    const updatedUser = await this.repository.save(userEntity);
    return TypeORMUserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async getAllUsers(): Promise<User[]> {
    const userEntities = await this.repository.find({ relations: ['tasks'] });
    return userEntities.map(TypeORMUserMapper.toDomain);
  }
}
