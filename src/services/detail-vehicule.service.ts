import { DetailVehiculeEntity } from '@/entities/details-vehicule.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class DetailVehiculeService extends Repository<DetailVehiculeEntity> {
  /**
   * fonction prendre DetailVehicule par id
   * @param detailVehiculeId
   */
  public async findDetailVehiculeById(detailVehiculeId: number) {
    if (isEmpty(detailVehiculeId)) throw new HttpException(400, "You're not detailVehiculeId");

    const findDetailVehicule = await DetailVehiculeEntity.findOne({ where: { idDetailVehicule: detailVehiculeId } });
    if (!findDetailVehicule) throw new HttpException(409, "You're not DetailVehicule");

    return findDetailVehicule;
  }

  /**
   * fonction supprimer DetailVehicule
   * @param detailVehiculeId
   */
  public async deleteDetailVehicule(detailVehiculeId: number) {
    if (isEmpty(detailVehiculeId)) throw new HttpException(400, "You're not detailVehiculeId");

    const findDetailVehicule = await DetailVehiculeEntity.findOne({ where: { idDetailVehicule: detailVehiculeId } });
    if (!findDetailVehicule) throw new HttpException(409, "You're not DetailVehicule");

    await DetailVehiculeEntity.delete({ idDetailVehicule: detailVehiculeId });
    return findDetailVehicule;
  }

  /**
   * fonction ajouter DetailVehicule
   * @param DetailVehiculeEntity
   */
  public async createDetailVehicule(detailVehiculeData: DetailVehiculeEntity) {
    const createDetailVehiculeData = await DetailVehiculeEntity.create(detailVehiculeData).save();
    return createDetailVehiculeData;
  }

  /**
   * function modifier DetailVehicule
   * @param detailVehiculeId
   * @param DetailVehiculeEntity
   */
  public async updateDetailVehicule(detailVehiculeId: number, detailVehiculeData: DetailVehiculeEntity) {
    if (isEmpty(detailVehiculeData)) throw new HttpException(400, "You're not detailVehiculeData");

    const findDetailVehicule = await DetailVehiculeEntity.findOne({ where: { idDetailVehicule: detailVehiculeId } });
    if (!findDetailVehicule) throw new HttpException(409, "You're not DetailVehicule");

    await DetailVehiculeEntity.update(detailVehiculeId, detailVehiculeData);

    const updateDetailVehicule = await DetailVehiculeEntity.findOne({ where: { idDetailVehicule: detailVehiculeId } });
    return updateDetailVehicule;
  }
}

export default DetailVehiculeService;
