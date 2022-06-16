import { FactureEntity } from '@/entities/facture.entity';
import { InputPagination } from '@/entities/pagination';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class FactureService extends Repository<FactureEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction lister tous les Factures
   */
  public async findAllFacture() {
    const Facture = await FactureEntity.find({ relations: ['infosFactures'] });
    return Facture;
  }

  /**
   * fonction prendre Facture par id
   * @param factureId
   */
  public async findFactureById(factureId: number) {
    if (isEmpty(factureId)) throw new HttpException(400, "You're not factureId");

    const findFacture = await FactureEntity.findOne({ relations: ['infosFactures'], where: { idFacture: factureId } });
    if (!findFacture) throw new HttpException(409, "You're not Facture");

    return findFacture;
  }

  /**
   * fonction supprimer Facture
   * @param factureId
   */
  public async deleteFacture(factureId: number) {
    if (isEmpty(factureId)) throw new HttpException(400, "You're not factureId");

    const findFacture = await FactureEntity.findOne({ where: { idFacture: factureId } });
    if (!findFacture) throw new HttpException(409, "You're not Facture");

    await FactureEntity.delete({ idFacture: factureId });
    return findFacture;
  }

  /**
   * fonction ajouter Facture
   * @param FactureEntity
   */
  public async createFacture(factureData: FactureEntity) {
    factureData.restePayer = factureData.total;
    const createFactureData = await FactureEntity.create(factureData).save();
    return createFactureData;
  }

  /**
   * function modifier Facture
   * @param factureId
   * @param FactureEntity
   */
  public async updateFacture(factureId: number, FactureData: FactureEntity) {
    if (isEmpty(FactureData)) throw new HttpException(400, "You're not FactureData");

    const findFacture = await FactureEntity.findOne({ where: { idFacture: factureId } });
    if (!findFacture) throw new HttpException(409, "You're not Facture");

    await FactureEntity.update(factureId, FactureData);

    const updateFacture = await FactureEntity.findOne({ where: { idFacture: factureId } });
    return updateFacture;
  }

  /**
   *
   * @returns liste Facture avec pagination
   */
  public async findFacturePaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [Facture, count] = await FactureEntity.findAndCount({ relations: ['infosFactures'], skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(Facture, count, inputPagination);
    return page;
  }

  /**
   * fonction lister tous les Factures par status
   */
  public async findAllFactureByStatus(status) {
    const Facture = await FactureEntity.find({ relations: ['infosFactures'], where: { satuts: status } });
    return Facture;
  }
}

export default FactureService;
