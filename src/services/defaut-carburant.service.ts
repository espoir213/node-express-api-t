import { DefautCarburantEntity } from '@/entities/defaut-carburant.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class DefautCarburantService extends Repository<DefautCarburantEntity> {
  /**
   * fonction prendre DefautCarburant par id
   * @param defautCarburantId
   */
  public async findDefautCarburantById(defautCarburantId: number) {
    if (isEmpty(defautCarburantId)) throw new HttpException(400, "You're not defautCarburantId");

    const findDefautCarburant = await DefautCarburantEntity.findOne({ where: { idDefautCarburant: defautCarburantId } });
    if (!findDefautCarburant) throw new HttpException(409, "You're not DefautCarburant");

    return findDefautCarburant;
  }

  /**
   * fonction supprimer DefautCarburant
   * @param defautCarburantId
   */
  public async deleteDefautCarburant(defautCarburantId: number) {
    if (isEmpty(defautCarburantId)) throw new HttpException(400, "You're not defautCarburantId");

    const findDefautCarburant = await DefautCarburantEntity.findOne({ where: { idDefautCarburant: defautCarburantId } });
    if (!findDefautCarburant) throw new HttpException(409, "You're not DefautCarburant");

    await DefautCarburantEntity.delete({ idDefautCarburant: defautCarburantId });
    return findDefautCarburant;
  }

  /**
   * fonction ajouter DefautCarburant
   * @param DefautCarburantEntity
   */
  public async createDefautCarburant(DefautCarburantData: DefautCarburantEntity) {
    const createDefautCarburantData = await DefautCarburantEntity.create(DefautCarburantData).save();
    return createDefautCarburantData;
  }

  /**
   * function modifier DefautCarburant
   * @param defautCarburantId
   * @param DefautCarburantEntity
   */
  public async updateDefautCarburant(defautCarburantId: number, DefautCarburantData: DefautCarburantEntity) {
    if (isEmpty(DefautCarburantData)) throw new HttpException(400, "You're not DefautCarburantData");

    const findDefautCarburant = await DefautCarburantEntity.findOne({ where: { idDefautCarburant: defautCarburantId } });
    if (!findDefautCarburant) throw new HttpException(409, "You're not DefautCarburant");

    await DefautCarburantEntity.update(defautCarburantId, DefautCarburantData);

    const updateDefautCarburant = await DefautCarburantEntity.findOne({ where: { idDefautCarburant: defautCarburantId } });
    return updateDefautCarburant;
  }
}

export default DefautCarburantService;
