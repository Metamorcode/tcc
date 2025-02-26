import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { UpdateMedicineUseCase } from './update-medicine';
import { Category } from '../../../enterprise/entities/category';
import { v4 as uuidv4 } from 'uuid';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';

describe('Update a Medicine', () => {
  const repository = new InMemoryMedicineRepository();

  it('should be able to update a Medicine', () => {
    const updateMedicine = new UpdateMedicineUseCase(repository);

    const category = new Category('1', 'Diário');
    const newId = uuidv4();
    repository.create({
      id: '1',
      description: 'Tomar remédio 2X ao dia',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: newId,
      name: 'Paracetamol',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS,
    });

    const medicineToUpdate = {
      id: '1',
      description: 'Tomar remédio 1X ao dia',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: newId,
      name: 'Ibuprofeno',
      quantity: 2,
      unit: MedicineUnit.ML,
    };

    updateMedicine.execute(medicineToUpdate);
    console.log(InMemoryMedicineRepository.medicines[0]);
    expect(InMemoryMedicineRepository.medicines[0]).toEqual(medicineToUpdate);
  });
});
