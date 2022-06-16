import { InfosDevisEntity } from '@/entities/infos-devis.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class InfosDevisService extends Repository<InfosDevisEntity> {
  /**
   * fonction prendre InfoDevis par id
   * @param InfoDevisId
   */
  public async findInfoDevisById(InfoDevisId: number) {
    if (isEmpty(InfoDevisId)) throw new HttpException(400, "You're not InfoDevisId");

    const findInfoDevis = await InfosDevisEntity.findOne({ where: { idInfosDevis: InfoDevisId } });
    if (!findInfoDevis) throw new HttpException(409, "You're not InfoDevis");

    return findInfoDevis;
  }

  /**
   * fonction supprimer InfoDevis
   * @param InfoDevisId
   */
  public async deleteInfoDevis(InfoDevisId: number) {
    if (isEmpty(InfoDevisId)) throw new HttpException(400, "You're not InfoDevisId");

    const findInfoDevis = await InfosDevisEntity.findOne({ where: { idInfosDevis: InfoDevisId } });
    if (!findInfoDevis) throw new HttpException(409, "You're not InfoDevis");

    await InfosDevisEntity.delete({ idInfosDevis: InfoDevisId });
    return findInfoDevis;
  }

  /**
   * fonction ajouter InfoDevis
   * @param InfosDevisEntity
   */
  public async createInfoDevis(InfoDevisData: InfosDevisEntity) {
    const createInfoDevisData = await InfosDevisEntity.create(InfoDevisData).save();
    return createInfoDevisData;
  }

  /**
   * function modifier InfoDevis
   * @param InfoDevisId
   * @param InfosDevisEntity
   */
  public async updateInfoDevis(InfoDevisId: number, InfoDevisData: InfosDevisEntity) {
    if (isEmpty(InfoDevisData)) throw new HttpException(400, "You're not InfoDevisData");

    const findInfoDevis = await InfosDevisEntity.findOne({ where: { idInfosDevis: InfoDevisId } });
    if (!findInfoDevis) throw new HttpException(409, "You're not InfoDevis");

    await InfosDevisEntity.update(InfoDevisId, InfoDevisData);

    const updateInfoDevis = await InfosDevisEntity.findOne({ where: { idInfosDevis: InfoDevisId } });
    return updateInfoDevis;
  }

  /**
   * fonction lister tous les InfoDeviss by id devis
   */
  public async findAllInfoDevisByIdDevis(idDevis: number) {
    const infoDevis = await InfosDevisEntity.find({ relations: ['devis'], where: { devis: { idDevis: idDevis } } });
    // infoDevis.map(({ devis, ...item }) => item);
    return infoDevis;
  }
}

export default InfosDevisService;
