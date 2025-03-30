import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElderlyRepository } from '../../../../domain/application/repositories/elderly-repository';
import { Elderly } from '../../../../domain/enterprise/entities/elderly';
import { ElderlyEntity } from '../entities/elderly.entity';
import { TypeORMElderlyMapper } from '../mappers/typeorm.elderly.mapper';

@Injectable()
export class TypeORMElderlyRepository implements ElderlyRepository {
  constructor(
    @InjectRepository(ElderlyEntity)
    private readonly repository: Repository<ElderlyEntity>
  ) {}

  async create(elderlyProps: Elderly): Promise<Elderly> {
    const elderlyEntity = TypeORMElderlyMapper.toTypeORM(elderlyProps);
    const savedElderly = await this.repository.save(elderlyEntity);
    return TypeORMElderlyMapper.toDomain(savedElderly);
  }

  async getById(id: string): Promise<Elderly | null> {
    console.log('log id do getById', id);
    const elderlyEntity = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!elderlyEntity) {
      return null;
    }
    return TypeORMElderlyMapper.toDomain(elderlyEntity);
  }

  async getFirstName(firstName: string): Promise<Elderly | null> {
    const elderlyEntity = await this.repository.findOne({
      where: { firstName },
    });
    return elderlyEntity ? TypeORMElderlyMapper.toDomain(elderlyEntity) : null;
  }

  async getLastName(lastName: string): Promise<Elderly | null> {
    const elderlyEntity = await this.repository.findOne({
      where: { lastName },
    });
    return elderlyEntity ? TypeORMElderlyMapper.toDomain(elderlyEntity) : null;
  }

  async update(elderly: Elderly): Promise<Elderly> {
    const elderlyId = elderly.getId();

    if (!elderlyId) {
      throw new Error('Elderly ID is required');
    }

    const existingElderly = await this.repository.findOne({
      where: { id: elderlyId },
    });

    if (!existingElderly) {
      throw new Error('Elderly not found');
    }

    const elderlyEntity = TypeORMElderlyMapper.toTypeORM(elderly);
    const updatedElderly = await this.repository.save(elderlyEntity);
    return TypeORMElderlyMapper.toDomain(updatedElderly);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async getAllElderly(): Promise<Elderly[]> {
    const elderlyEntities = await this.repository.find({ relations: ['tasks'] });
    return elderlyEntities.map(TypeORMElderlyMapper.toDomain);
  }
}
