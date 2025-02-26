import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { CreateMedicineUseCase } from './create-medicine';
import { Category } from '../../../enterprise/entities/category';
import { Elderly } from '../../../enterprise/entities/elderly';
import { v4 as uuidv4 } from 'uuid';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';

describe('Create a Medicine', () => {
  const repository = new InMemoryMedicineRepository();

  it('should be able to create a new Medicine', () => {
    const createMedicine = new CreateMedicineUseCase(repository);
    const category = new Category('1', 'Diário');
    const newId = uuidv4();

    const elderly = new Elderly(
      'Florêncio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      newId
    );

    createMedicine.execute({
      description: 'Tomar remédio 2X ao dia',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: newId,
      name: 'Paracetamol',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS
    });
    
    expect(InMemoryMedicineRepository.medicines.length).toEqual(1);
  });
});
