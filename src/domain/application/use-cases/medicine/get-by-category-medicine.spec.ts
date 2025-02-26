import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { GetByCategoryMedicineUseCase } from './get-by-category-medicine';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';

import { Category } from '../../../enterprise/entities/category';

describe('Get Medicine by category', () => {
  const repository = new InMemoryMedicineRepository();
  const dailyCategory = new Category('1', 'Diário');
  const monthCategory = new Category('2', 'Mensal');

  it('should be able to get a Medicine by category', () => {
    repository.create({
      id: '1',
      description: 'Tomar remédio 2X ao dia',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: dailyCategory,
      repeatFor: 5,
      completed: false,
      elderlyId: '123',
      name: 'Paracetamol',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS,
    });

    repository.create({
      id: '1',
      description: 'Tomar remédio 1X ao dia',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: monthCategory,
      repeatFor: 5,
      completed: false,
      elderlyId: '123',
      name: 'Ibuprofeno',
      quantity: 2,
      unit: MedicineUnit.ML,
    });

    const getCategory = new GetByCategoryMedicineUseCase(repository);
    const result = getCategory.execute('Diário') || [];
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      id: '1',
      description: 'Tomar remédio 2X ao dia',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: dailyCategory,
      repeatFor: 5,
      completed: false,
      elderlyId: '123',
      name: 'Paracetamol',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS,
    });
  });
});
