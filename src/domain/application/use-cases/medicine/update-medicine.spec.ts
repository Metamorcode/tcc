import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { UpdateMedicineUseCase } from './update-medicine';
import { Medicine } from '../../../../domain/enterprise/entities/medicine';
import { UpdateMedicineDto } from '../../../../infrastructure/http/controllers/dto/update-medicine-dto';
import { Category } from '../../../../domain/enterprise/entities/category';
import { MedicineUnit } from '../../../../domain/enterprise/entities/medicine.unit';
import { v4 as uuidv4 } from 'uuid';

describe('Update a Medicine', () => {
  let repository: InMemoryMedicineRepository;
  let updateMedicine: UpdateMedicineUseCase;

  beforeEach(() => {
    repository = new InMemoryMedicineRepository();
    updateMedicine = new UpdateMedicineUseCase(repository);
  });

  it('should be able to update a medicine', async () => {
    const category = new Category(uuidv4(), 'Diário');
    const elderlyId = uuidv4();
    const medicineId = uuidv4(); 

    const medicine = new Medicine(
      'Paracetamol',
      2,
      MedicineUnit.COMPRIMIDOS,
      'Tomar remédio 2X ao dia',
      new Date('2025-02-25T09:00:00.000Z'),
      category,
      5,
      false,
      elderlyId,
      medicineId // Usando o ID gerado aqui
    );

    await repository.create(medicine);
    const createdMedicine = await repository.getById(medicine.getMedicineId()); 
    expect(createdMedicine).not.toBeNull();

    const updateMedicineDto: UpdateMedicineDto = {
      name: 'Ibuprofeno',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS,
      description: 'Tomar remédio 1X ao dia',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: new Category('2', 'Mensal'),
      repeatFor: 5,
      completed: false,
      elderlyId: 'elderly-id-123',
    };

    const updatedMedicine = await updateMedicine.execute(medicine.getMedicineId(), updateMedicineDto); 

    expect(updatedMedicine).not.toBeNull();
    expect(updatedMedicine?.getName()).toBe('Ibuprofeno');
    expect(updatedMedicine?.getQuantity()).toBe(2);
    expect(updatedMedicine?.getUnit()).toBe(MedicineUnit.COMPRIMIDOS);
    expect(updatedMedicine?.getDescription()).toBe('Tomar remédio 1X ao dia');
    expect(updatedMedicine?.getEventTime()).toEqual(new Date('2025-02-25T12:00:00.000Z'));
    expect(updatedMedicine?.getCategory().getId()).toBe('2'); 
    expect(updatedMedicine?.getRepeatFor()).toBe(5);
    expect(updatedMedicine?.getCompleted()).toBe(false);
    expect(updatedMedicine?.getElderlyId()).toBe('elderly-id-123');
  });

  it('should throw an error if the medicine is not found', async () => {
    const updateMedicineDto: UpdateMedicineDto = {
      name: 'Ibuprofeno',
      quantity: 2,
      unit: MedicineUnit.COMPRIMIDOS,
      description: 'Tomar remédio 1X ao dia',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: new Category('2', 'Mensal'),
      repeatFor: 5,
      completed: false,
      elderlyId: 'elderly-id-123',
    };

    await expect(updateMedicine.execute(uuidv4(), updateMedicineDto)).rejects.toThrowError('Medicine not found');
  });
});
