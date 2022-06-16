import { InputPagination } from '@/entities/pagination';
import { ProjetEntity, StatusProjet, TestRoutiers } from '@/entities/projet.entity';
import { RemarqueProjetEntity } from '@/entities/remarque-projet.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class ProjetService extends Repository<ProjetEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction lister tous les Projets
   */
  public async findAllProjet() {
    const projets = await ProjetEntity.find();
    return projets;
  }

  /**
   * fonction prendre Projet par id
   * @param projetId
   */
  public async findProjetById(projetId: number) {
    if (isEmpty(projetId)) throw new HttpException(400, "You're not projetId");

    const findProjet = await ProjetEntity.findOne({ where: { idProjet: projetId }, relations: ['remarques'] });
    findProjet.vehicules.defautCarburants.travauxDemmander = JSON.parse(findProjet.vehicules.defautCarburants.travauxDemmander);
    findProjet.vehicules.pieceVehicules.verificationPieces = JSON.parse(findProjet.vehicules.pieceVehicules.verificationPieces);
    if (!findProjet) throw new HttpException(409, "You're not Projet");

    return findProjet;
  }

  /**
   * fonction supprimer Projet
   * @param projetId
   */
  public async deleteProjet(projetId: number) {
    if (isEmpty(projetId)) throw new HttpException(400, "You're not projetId");

    const findProjet = await ProjetEntity.findOne({ where: { idProjet: projetId } });
    if (!findProjet) throw new HttpException(409, "You're not Projet");

    await ProjetEntity.delete({ idProjet: projetId });
    return findProjet;
  }

  /**
   * fonction ajouter Projet
   * @param ProjetEntity
   */
  public async createProjet(projetData: ProjetEntity) {
    const createProjetData = await ProjetEntity.create(projetData).save();
    return createProjetData;
  }

  /**
   * function modifier Projet
   * @param projetId
   * @param ProjetEntity
   */
  public async updateProjet(projetId: number, projetData: ProjetEntity) {
    if (isEmpty(projetData)) throw new HttpException(400, "You're not projetData");

    const findProjet = await ProjetEntity.findOne({ where: { idProjet: projetId } });
    if (!findProjet) throw new HttpException(409, "You're not Projet");

    if (projetData.satus) projetData.satus = StatusProjet[projetData.satus];
    if (projetData.testRoutier) projetData.testRoutier = TestRoutiers[projetData.testRoutier];

    await ProjetEntity.update(projetId, projetData);

    const updateProjet = await ProjetEntity.findOne({ where: { idProjet: projetId } });
    return updateProjet;
  }

  /**
   *
   * @returns liste Projet avec pagination
   */
  public async findProjetPaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [users, count] = await ProjetEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(users, count, inputPagination);
    return page;
  }

  /**
   * fonction lister tous les Projets client
   */
  public async findAllProjetByClientId(idClient: number) {
    const projets = await ProjetEntity.find({ relations: ['vehicules'], where: { vehicules: { clients: { idClient: idClient } } } });
    return projets;
  }

  /**
   * get all projet by status
   */
  public async getAllProjetByStatus(status: string) {
    const Projets = await ProjetEntity.find({ where: { satus: StatusProjet[status] } });
    return Projets;
  }

  /**
   * fonction ajouter remarque Projet
   * @param CreateProjetDto
   */
  public async createRemarqueProjet(remarqueProjetData: RemarqueProjetEntity) {
    const createRemarqueProjetData = await RemarqueProjetEntity.create(remarqueProjetData).save();
    return createRemarqueProjetData;
  }

  /**
   * fonction supprimer remarque Projet
   * @param idRemaque
   */
  public async deleteRemarqueProjet(idRemaque: number) {
    if (isEmpty(idRemaque)) throw new HttpException(400, "You're not idRemaque");

    const findRemarqueProjet = await RemarqueProjetEntity.findOne({ where: { idRemarque: idRemaque } });
    if (!findRemarqueProjet) throw new HttpException(409, "You're not Projet");

    await RemarqueProjetEntity.delete({ idRemarque: idRemaque });
    return findRemarqueProjet;
  }
}

export default ProjetService;
