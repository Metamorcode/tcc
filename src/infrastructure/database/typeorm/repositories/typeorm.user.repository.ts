import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserProps,
  UserRepository,
} from '../../../../domain/application/repositories/user-repository';
import { User } from '../../../../domain/enterprise/entities/user';
import { UserEntity } from '../entities/user.entity';
import { TypeORMUserMapper } from '../mappers/typeorm.user.mapper';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(userProps: User): Promise<void> {
    const user = new User(
      userProps.getFirstName(),
      userProps.getLastName(),
      userProps.getEmail(),
      userProps.getLogin(),
      userProps.getPassword(),
      userProps.getRole()
      //userProps.getTasks(),
    );
    const userEntity = TypeORMUserMapper.toTypeORM(user);
    await this.repository.save(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!userEntity) {
      return null;
    }

    return TypeORMUserMapper.toDomain(userEntity);
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.repository.find({
      relations: ['tasks'],
    });

    return userEntities.map(TypeORMUserMapper.toDomain);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { email },
    });

    if (!userEntity) {
      return null;
    }

    return TypeORMUserMapper.toDomain(userEntity);
  }

  async update(userProps: UserProps): Promise<void> {
    const user = new User(
      userProps.firstName,
      userProps.lastName,
      userProps.email,
      userProps.login,
      userProps.password,
      userProps.role,
      userProps.id
    );
    const userEntity = TypeORMUserMapper.toTypeORM(user);
    await this.repository.save(userEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getByName(firstName: string, lastName: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { firstName, lastName },
    });

    if (!userEntity) {
      return null;
    }

    return TypeORMUserMapper.toDomain(userEntity);
  }

  async getAllUsers(): Promise<User[]> {
    const userEntities = await this.repository.find();
    return userEntities.map(TypeORMUserMapper.toDomain);
  }

  async getFirstName(firstName: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { firstName },
    });

    if (!userEntity) {
      return null;
    }

    return TypeORMUserMapper.toDomain(userEntity);
  }

  async getLastName(lastName: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { lastName },
    });

    if (!userEntity) {
      return null;
    }

    return TypeORMUserMapper.toDomain(userEntity);
  }
}
