import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { GetAllMedicinesUseCase } from './get-all-medicines';
import { Category } from '../../../enterprise/entities/category';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';
import { Medicine } from '../../../enterprise/entities/medicine';
import { v4 as uuidv4 } from 'uuid';

describe('Get all Medicines', () => {
  let repository: InMemoryMedicineRepository;
  let getAllMedicines: GetAllMedicinesUseCase;

  beforeEach(() => {
    repository = new InMemoryMedicineRepository();
    getAllMedicines = new GetAllMedicinesUseCase(repository);
  });

  it('should be able to get all medicines', async () => {
    const category = new Category(uuidv4(), 'Diário');
    const elderlyId = uuidv4();
    const medicineId = uuidv4(); 

    // Criando dois medicamentos
    const medicine1 = new Medicine(
      'Paracetamol 1000mg',
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

    const medicine2 = new Medicine(
      'Paracetamol 500mg',
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

    await repository.create(medicine1);
    await repository.create(medicine2);

    // Recuperando todos os medicamentos
    const result = await getAllMedicines.execute();

    // Verificando que o número de medicamentos é o esperado
    expect(result.length).toBe(2);
    expect(result[0].getName()).toBe('Paracetamol 1000mg');
    expect(result[1].getName()).toBe('Paracetamol 500mg');
  });

  it('should return an empty list if no medicines exist', async () => {
    const result = await getAllMedicines.execute();

    // Verificando que a lista está vazia
    expect(result.length).toBe(0);
  });
});
