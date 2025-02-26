import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { GetAllMedicinesUseCase } from './get-all-medicines';
import { Category } from '../../../enterprise/entities/category';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';

describe('Get Medicine by name', () => {
  it('should be able to get all Medicines', async () => {
    const repository = new InMemoryMedicineRepository();
    const category = new Category('1', 'Diário');
    await repository.create({
      id: '1',
      description: 'Tomar remédio 2X ao dia',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: '123',
      name: 'Paracetamol',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS
    });

    await repository.create({
      id: '2',
      description: 'Tomar remédio 1X ao dia',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: '333',
      name: 'Ibuprofeno',
      quantity: 2,
      unit: MedicineUnit.ML,
    });

    const getMedicines = new GetAllMedicinesUseCase(repository);
    const result = await getMedicines.execute();

    expect(result.length).toBe(2);
  });
});
