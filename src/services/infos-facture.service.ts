import { InfosFactureEntity } from '@/entities/infos-facture.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class InfosFactureService extends Repository<InfosFactureEntity> {
  /**
   * fonction prendre InfoFacture par id
   * @param InfoFactureId
   */
  public async findInfoFactureById(InfoFactureId: number) {
    if (isEmpty(InfoFactureId)) throw new HttpException(400, "You're not InfoFactureId");

    const findInfoFacture = await InfosFactureEntity.findOne({ where: { idInfosFacture: InfoFactureId } });
    if (!findInfoFacture) throw new HttpException(409, "You're not InfoFacture");

    return findInfoFacture;
  }

  /**
   * fonction supprimer InfoFacture
   * @param InfoFactureId
   */
  public async deleteInfoFacture(InfoFactureId: number) {
    if (isEmpty(InfoFactureId)) throw new HttpException(400, "You're not InfoFactureId");

    const findInfoFacture = await InfosFactureEntity.findOne({ where: { idInfosFacture: InfoFactureId } });
    if (!findInfoFacture) throw new HttpException(409, "You're not InfoFacture");

    await InfosFactureEntity.delete({ idInfosFacture: InfoFactureId });
    return findInfoFacture;
  }

  /**
   * fonction ajouter InfoFacture
   * @param InfosFactureEntity
   */
  public async createInfoFacture(InfoFactureData: InfosFactureEntity) {
    const createInfoFactureData = await InfosFactureEntity.create(InfoFactureData).save();
    return createInfoFactureData;
  }

  /**
   * function modifier InfoFacture
   * @param InfoFactureId
   * @param InfosFactureEntity
   */
  public async updateInfoFacture(InfoFactureId: number, InfoFactureData: InfosFactureEntity) {
    if (isEmpty(InfoFactureData)) throw new HttpException(400, "You're not InfoFactureData");

    const findInfoFacture = await InfosFactureEntity.findOne({ where: { idInfosFacture: InfoFactureId } });
    if (!findInfoFacture) throw new HttpException(409, "You're not InfoFacture");

    await InfosFactureEntity.update(InfoFactureId, InfoFactureData);

    const updateInfoFacture = await InfosFactureEntity.findOne({ where: { idInfosFacture: InfoFactureId } });
    return updateInfoFacture;
  }

  /**
   * fonction lister tous les InfoFactures by id Facture
   */
  public async findAllInfoFactureByIdFacture(idFacture: number) {
    const infoFacture = await InfosFactureEntity.find({ relations: ['facture'], where: { facture: { idFacture: idFacture } } });
    return infoFacture;
  }
}

export default InfosFactureService;
