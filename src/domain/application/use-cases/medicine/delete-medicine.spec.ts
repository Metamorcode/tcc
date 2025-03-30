import { InMemoryMedicineRepository } from '../../../../../test/in-memory/in-memory-medicine-repository';
import { DeleteMedicineUseCase } from './delete-medicine';
import { Category } from '../../../enterprise/entities/category';
import { Medicine } from '../../../enterprise/entities/medicine';
import { v4 as uuidv4 } from 'uuid';
import { MedicineUnit } from '../../../enterprise/entities/medicine.unit';
import { NotFoundException } from '@nestjs/common';

describe('Delete a Medicine', () => {
  let repository: InMemoryMedicineRepository;
  let deleteMedicine: DeleteMedicineUseCase;

  beforeEach(() => {
    repository = new InMemoryMedicineRepository();
    deleteMedicine = new DeleteMedicineUseCase(repository);
  });

  it('should be able to delete a medicine', async () => {
    const category = new Category(uuidv4(), 'Diário');
    const elderlyId = uuidv4();
    const medicineId = uuidv4(); // ID gerado corretamente

    // Criando instância de um medicamento
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

    // Criar o medicamento
    await repository.create(medicine);

    // Verificar que o medicamento foi criado
    const createdMedicine = await repository.getById(medicine.getMedicineId()); // Usando o ID correto
    expect(createdMedicine).not.toBeNull(); // Confirma que o medicamento foi criado

    // Deletar o medicamento
    await deleteMedicine.execute(medicine.getMedicineId()); // Deletando com o ID correto

    // Verificar que o medicamento foi deletado
    const deletedMedicine = await repository.getById(medicine.getMedicineId());
    expect(deletedMedicine).toBeNull(); // Confirma que o medicamento foi deletado
  });

  it('should throw an error if the medicine does not exist', async () => {
    const id = uuidv4();

    // Tentar deletar um medicamento que não existe
    await expect(deleteMedicine.execute(id)).rejects.toThrowError(NotFoundException);
    await expect(deleteMedicine.execute(id)).rejects.toThrowError('Medicine not found');
  });
});
