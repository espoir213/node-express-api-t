import { VehiculeEntity } from '@/entities/vehicule.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class VehiculeService extends Repository<VehiculeEntity> {
  /**
   * fonction prendre Vehicule par id
   * @param vehiculeId
   */
  public async findVehiculeById(vehiculeId: number) {
    if (isEmpty(vehiculeId)) throw new HttpException(400, "You're not vehiculeId");

    const findVehicule = await VehiculeEntity.findOne({ where: { idVehicule: vehiculeId } });
    if (!findVehicule) throw new HttpException(409, "You're not Vehicule");

    return findVehicule;
  }

  /**
   * fonction supprimer Vehicule
   * @param vehiculeId
   */
  public async deleteVehicule(vehiculeId: number) {
    if (isEmpty(vehiculeId)) throw new HttpException(400, "You're not vehiculeId");

    const findVehicule = await VehiculeEntity.findOne({ where: { idVehicule: vehiculeId } });
    if (!findVehicule) throw new HttpException(409, "You're not Vehicule");

    await VehiculeEntity.delete({ idVehicule: vehiculeId });
    return findVehicule;
  }

  /**
   * fonction ajouter Vehicule
   * @param VehiculeEntity
   */
  public async createVehicule(VehiculeData: VehiculeEntity) {
    const createVehiculeData = await VehiculeEntity.create(VehiculeData).save();
    return createVehiculeData;
  }

  /**
   * function modifier Vehicule
   * @param vehiculeId
   * @param VehiculeEntity
   */
  public async updateVehicule(vehiculeId: number, VehiculeData: VehiculeEntity) {
    if (isEmpty(VehiculeData)) throw new HttpException(400, "You're not VehiculeData");

    const findVehicule = await VehiculeEntity.findOne({ where: { idVehicule: vehiculeId } });
    if (!findVehicule) throw new HttpException(409, "You're not Vehicule");

    await VehiculeEntity.update(vehiculeId, VehiculeData);

    const updateVehicule = await VehiculeEntity.findOne({ where: { idVehicule: vehiculeId } });
    return updateVehicule;
  }
}

export default VehiculeService;
