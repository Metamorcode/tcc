import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { DeleteMedicineUseCase } from './delete-medicine';
import { Category } from '../../../enterprise/entities/category';
import { Elderly } from '../../../enterprise/entities/elderly';
import { Medicine } from '../../../enterprise/entities/medicine';
import { v4 as uuidv4 } from 'uuid';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';

describe('Delete a Medicine', () => {
  const repository = new InMemoryMedicineRepository();

  it('should be able to Delete a Medicine', () => {
    const deleteMedicine = new DeleteMedicineUseCase(repository);
    const category = new Category('1', 'Diário');
    const newId = uuidv4();
    const elderly = new Elderly(
      'Florêncio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      newId
    );

    repository.create({
      name: 'Paracetamol',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS,
      description: 'Tomar remédio 2X ao dia',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: newId,
      id: '1',
      createdAt: new Date('2025-02-01T09:00:00.000Z'),
    });

    console.log(InMemoryMedicineRepository.medicines.length);
    deleteMedicine.execute('1');
    console.log(InMemoryMedicineRepository.medicines.length);
    expect(InMemoryMedicineRepository.medicines.length).toEqual(0);
  });
});
