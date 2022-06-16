import { InventaireEntity } from '@/entities/inventaire.entity';
import { InputPagination } from '@/entities/pagination';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class InventaireService extends Repository<InventaireEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction lister tous les Inventaires
   */
  public async findAllInventaire() {
    const Inventaires = await InventaireEntity.find();
    return Inventaires;
  }

  /**
   * fonction supprimer Inventaire
   * @param inventaireId
   */
  public async deleteInventaire(inventaireId: number) {
    if (isEmpty(inventaireId)) throw new HttpException(400, "You're not inventaireId");

    const findInventaire = await InventaireEntity.findOne({ where: { idInventaire: inventaireId } });
    if (!findInventaire) throw new HttpException(409, "You're not Inventaire");

    await InventaireEntity.delete({ idInventaire: inventaireId });
    return findInventaire;
  }

  /**
   * fonction ajouter Inventaire
   * @param InventaireEntity
   */
  public async createInventaire(inventaireData: InventaireEntity) {
    const createInventaireData = await InventaireEntity.create(inventaireData).save();
    return createInventaireData;
  }

  /**
   * function modifier Inventaire
   * @param inventaireId
   * @param InventaireEntity
   */
  public async updateInventaire(inventaireId: number, inventaireData: InventaireEntity) {
    if (isEmpty(inventaireData)) throw new HttpException(400, "You're not inventaireData");

    const findInventaire = await InventaireEntity.findOne({ where: { idInventaire: inventaireId } });
    if (!findInventaire) throw new HttpException(409, "You're not Inventaire");

    await InventaireEntity.update(inventaireId, inventaireData);
    const updateInventaire = await InventaireEntity.findOne({ where: { idInventaire: inventaireId } });
    return updateInventaire;
  }

  /**
   *
   * @returns liste Inventaire avec pagination
   */
  public async findInventairePaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [users, count] = await InventaireEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(users, count, inputPagination);
    return page;
  }

  /**
   * fonction prendre categorie par id
   * @param inventaireId
   */
  public async findInventaireById(inventaireId: number) {
    if (isEmpty(inventaireId)) throw new HttpException(400, "You're not inventaireId");

    const findCategorie = await InventaireEntity.findOne({ where: { idInventaire: inventaireId } });
    if (!findCategorie) throw new HttpException(409, "You're not categorie");

    return findCategorie;
  }
}

export default InventaireService;
