import { DevisEntity } from '@/entities/devis.entity';
import { InputPagination } from '@/entities/pagination';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class DevisService extends Repository<DevisEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction lister tous les Deviss
   */
  public async findAllDevis() {
    const devis = await DevisEntity.find({ relations: ['infosDevis'] });
    return devis;
  }

  /**
   * fonction prendre Devis par id
   * @param DevisId
   */
  public async findDevisById(DevisId: number) {
    if (isEmpty(DevisId)) throw new HttpException(400, "You're not DevisId");

    const findDevis = await DevisEntity.findOne({ relations: ['infosDevis'], where: { idDevis: DevisId } });
    if (!findDevis) throw new HttpException(409, "You're not Devis");

    return findDevis;
  }

  /**
   * fonction supprimer Devis
   * @param DevisId
   */
  public async deleteDevis(DevisId: number) {
    if (isEmpty(DevisId)) throw new HttpException(400, "You're not DevisId");

    const findDevis = await DevisEntity.findOne({ where: { idDevis: DevisId } });
    if (!findDevis) throw new HttpException(409, "You're not Devis");

    await DevisEntity.delete({ idDevis: DevisId });
    return findDevis;
  }

  /**
   * fonction ajouter Devis
   * @param DevisEntity
   */
  public async createDevis(DevisData: DevisEntity) {
    const createDevisData = await DevisEntity.create(DevisData).save();
    return createDevisData;
  }

  /**
   * function modifier Devis
   * @param DevisId
   * @param DevisEntity
   */
  public async updateDevis(DevisId: number, DevisData: DevisEntity) {
    if (isEmpty(DevisData)) throw new HttpException(400, "You're not DevisData");

    const findDevis = await DevisEntity.findOne({ where: { idDevis: DevisId } });
    if (!findDevis) throw new HttpException(409, "You're not Devis");

    await DevisEntity.update(DevisId, DevisData);

    const updateDevis = await DevisEntity.findOne({ where: { idDevis: DevisId } });
    return updateDevis;
  }

  /**
   *
   * @returns liste Devis avec pagination
   */
  public async findDevisPaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [devis, count] = await DevisEntity.findAndCount({ relations: ['infosDevis'], skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(devis, count, inputPagination);
    return page;
  }
}

export default DevisService;
