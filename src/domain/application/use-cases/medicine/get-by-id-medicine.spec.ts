import { Medicine } from '../../../../domain/enterprise/entities/medicine';
import { Category } from '../../../../domain/enterprise/entities/category';
import { MedicineUnit } from '../../../../domain/enterprise/entities/medicine.unit';
import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { GetByIdMedicineUseCase } from './get-by-id-medicine';
import { NotFoundException } from '@nestjs/common';

describe('Get medicine by id', () => {
  let repository: InMemoryMedicineRepository;
  let getByIdMedicine: GetByIdMedicineUseCase;

  beforeEach(() => {
    repository = new InMemoryMedicineRepository();
    getByIdMedicine = new GetByIdMedicineUseCase(repository);
  });

  it('should be able to get a medicine by id', async () => {
    const category = new Category('Health', 'Health-related tasks');
    const medicine1 = new Medicine(
      'Aspirin',
      500,
      MedicineUnit.COMPRIMIDOS,
      'Pain relief',
      new Date(),
      category,
      30,
      true,
      'elderly-id-1',
      'user-id-1',
      'medicine-id-1'
    );

    const medicine2 = new Medicine(
      'Paracetamol',
      500,
      MedicineUnit.COMPRIMIDOS,
      'Pain relief',
      new Date(),
      category,
      20,
      false,
      'elderly-id-2',
      'user-id-2',
      'medicine-id-2'
    );

    await repository.create(medicine1);
    await repository.create(medicine2);

    const result = await getByIdMedicine.execute('medicine-id-1');

    expect(result).not.toBeNull();
    expect(result?.getName()).toBe('Aspirin');
    expect(result?.getQuantity()).toBe(500);
  });

  it('should throw an error if the medicine does not exist', async () => {
    const nonExistentId = 'non-existent-medicine-id';
    await expect(getByIdMedicine.execute(nonExistentId)).rejects.toThrowError(NotFoundException);
  });
});
