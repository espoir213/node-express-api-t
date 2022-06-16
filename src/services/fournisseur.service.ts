import { FournisseurEntity } from '@/entities/fournisseur.entity';
import { InputPagination } from '@/entities/pagination';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class FournisseurService extends Repository<FournisseurEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction lister tous les Fournisseurs
   */
  public async findAllFournisseur() {
    const Fournisseurs = await FournisseurEntity.find();
    return Fournisseurs;
  }

  /**
   * fonction supprimer Fournisseur
   * @param fournisseurId
   */
  public async deleteFournisseur(fournisseurId: number) {
    if (isEmpty(fournisseurId)) throw new HttpException(400, "You're not fournisseurId");

    const findFournisseur = await FournisseurEntity.findOne({ where: { idFournisseur: fournisseurId } });
    if (!findFournisseur) throw new HttpException(409, "You're not Fournisseur");

    await FournisseurEntity.delete({ idFournisseur: fournisseurId });
    return findFournisseur;
  }

  /**
   * fonction ajouter Fournisseur
   * @param FournisseurEntity
   */
  public async createFournisseur(fournisseurData: FournisseurEntity) {
    const Fournisseur = await this.getFournisseurByEmail(fournisseurData.email);
    if (Fournisseur) throw new HttpException(409, `You're email ${fournisseurData.email} already exists`);
    const createFournisseurData = await FournisseurEntity.create(fournisseurData).save();
    return createFournisseurData;
  }

  /**
   * function modifier Fournisseur
   * @param fournisseurId
   * @param FournisseurEntity
   */
  public async updateFournisseur(fournisseurId: number, fournisseurData: FournisseurEntity) {
    if (isEmpty(fournisseurData)) throw new HttpException(400, "You're not fournisseurData");

    const findFournisseur = await FournisseurEntity.findOne({ where: { idFournisseur: fournisseurId } });
    if (!findFournisseur) throw new HttpException(409, "You're not Fournisseur");

    await FournisseurEntity.update(fournisseurId, fournisseurData);
    const updateFournisseur = await FournisseurEntity.findOne({ where: { idFournisseur: fournisseurId } });
    return updateFournisseur;
  }

  /**
   * function get Fournisseur by email
   * @param email
   */
  public async getFournisseurByEmail(email: String) {
    const findFournisseur = await FournisseurEntity.findOne({ where: { email: email } });
    return findFournisseur;
  }

  /**
   *
   * @returns liste Fournisseur avec pagination
   */
  public async findFournisseurPaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [users, count] = await FournisseurEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(users, count, inputPagination);
    return page;
  }

  /**
   * fonction prendre categorie par id
   * @param fournisseurId
   */
  public async findFournisseurById(fournisseurId: number) {
    if (isEmpty(fournisseurId)) throw new HttpException(400, "You're not fournisseurId");

    const findCategorie = await FournisseurEntity.findOne({ where: { idFournisseur: fournisseurId } });
    if (!findCategorie) throw new HttpException(409, "You're not categorie");

    return findCategorie;
  }
}

export default FournisseurService;
