import { PorteurVehiculeEntity } from '@/entities/porteur-veicule.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class PorteurVehiculeService extends Repository<PorteurVehiculeEntity> {
  /**
   * fonction prendre PorteurVehicule par id
   * @param porteurVehiculeId
   */
  public async findPorteurVehiculeById(porteurVehiculeId: number) {
    if (isEmpty(porteurVehiculeId)) throw new HttpException(400, "You're not porteurVehiculeId");
    const findPorteurVehicule = await PorteurVehiculeEntity.findOne({ where: { idPorteurVehicule: porteurVehiculeId } });
    return findPorteurVehicule;
  }

  /**
   * fonction supprimer PorteurVehicule
   * @param porteurVehiculeId
   */
  public async deletePorteurVehicule(porteurVehiculeId: number) {
    if (isEmpty(porteurVehiculeId)) throw new HttpException(400, "You're not porteurVehiculeId");

    const findPorteurVehicule = await PorteurVehiculeEntity.findOne({ where: { idPorteurVehicule: porteurVehiculeId } });
    if (!findPorteurVehicule) throw new HttpException(409, "You're not PorteurVehicule");

    await PorteurVehiculeEntity.delete({ idPorteurVehicule: porteurVehiculeId });
    return findPorteurVehicule;
  }

  /**
   * fonction ajouter PorteurVehicule
   * @param CreatePorteurVehiculeDto
   */
  public async createPorteurVehicule(porteurVehiculeData: PorteurVehiculeEntity) {
    const createPorteurVehiculeData = await PorteurVehiculeEntity.create(porteurVehiculeData).save();
    return createPorteurVehiculeData;
  }

  /**
   * function modifier PorteurVehicule
   * @param porteurVehiculeId
   * @param CreatePorteurVehiculeDto
   */
  public async updatePorteurVehicule(porteurVehiculeId: number, PorteurVehiculeData: PorteurVehiculeEntity) {
    if (isEmpty(PorteurVehiculeData)) throw new HttpException(400, "You're not PorteurVehiculeData");

    const findPorteurVehicule = await PorteurVehiculeEntity.findOne({ where: { idPorteurVehicule: porteurVehiculeId } });
    if (!findPorteurVehicule) throw new HttpException(409, "You're not PorteurVehicule");

    await PorteurVehiculeEntity.update(porteurVehiculeId, PorteurVehiculeData);
    const updatePorteurVehicule = await PorteurVehiculeEntity.findOne({ where: { idPorteurVehicule: porteurVehiculeId } });
    return updatePorteurVehicule;
  }
}

export default PorteurVehiculeService;
