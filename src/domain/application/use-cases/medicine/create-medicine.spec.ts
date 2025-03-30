import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { CreateMedicineUseCase } from './create-medicine';
import { CategoryDto } from '../../../../infrastructure/http/controllers/dto/category.dto';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';
import { validate as isUUID } from 'uuid';

describe('Create Medicine', () => {
  const repository = new InMemoryMedicineRepository();

  it('should be able to create a new medicine', async () => {
    const createMedicine = new CreateMedicineUseCase(repository);
    const categoryDto = new CategoryDto();
    categoryDto.id = '1';
    categoryDto.description = 'Diário';

    const elderlyId = '123e4567-e89b-12d3-a456-426614174000';
    const userId = 'user-id-1234';

    const createdMedicine = await createMedicine.execute(
      'Paracetamol',
      2,
      MedicineUnit.COMPRIMIDOS,
      'Tomar remédio 2X ao dia',
      new Date('2025-02-25T09:00:00.000Z'),
      categoryDto,
      5,
      false,
      elderlyId,
      userId
    );

    expect((await repository.getAllMedicines()).length).toEqual(1);
    expect(isUUID(createdMedicine.getId()!)).toBe(true);
    expect(createdMedicine.getName()).toBe('Paracetamol');
    expect(createdMedicine.getQuantity()).toBe(2);
    expect(createdMedicine.getUnit()).toBe(MedicineUnit.COMPRIMIDOS);
    expect(createdMedicine.getDescription()).toBe('Tomar remédio 2X ao dia');
    expect(createdMedicine.getEventTime()).toEqual(new Date('2025-02-25T09:00:00.000Z'));
    expect(createdMedicine.getCategory().getId()).toBe('1');
    expect(createdMedicine.getCategory().getDescription()).toBe('Diário');
    expect(createdMedicine.getRepeatFor()).toBe(5);
    expect(createdMedicine.getCompleted()).toBe(false);
    expect(createdMedicine.getElderlyId()).toBe(elderlyId);
    expect(createdMedicine.getUserId()).toBe(userId);
  });
});
