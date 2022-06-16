import { MembreHasCampagneEntity } from '@/entities/membre-has-campagne.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class MembreHasCampagneService extends Repository<MembreHasCampagneEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction supprimer MembreHasCampagne
   * @param membreHasCampagneId
   */
  public async deleteMembreHasCampagne(membreHasCampagneId: number) {
    if (isEmpty(membreHasCampagneId)) throw new HttpException(400, "You're not membreHasCampagneId");

    const findMembreHasCampagne = await MembreHasCampagneEntity.findOne({ where: { id: membreHasCampagneId } });
    if (!findMembreHasCampagne) throw new HttpException(409, "You're not MembreHasCampagne");

    await MembreHasCampagneEntity.delete({ id: membreHasCampagneId });
    return findMembreHasCampagne;
  }

  /**
   * fonction ajouter MembreHasCampagne
   * @param MembreHasCampagneEntity
   */
  public async createMembreHasCampagne(membreHasCampagneData: MembreHasCampagneEntity) {
    const createMembreHasCampagneData = await MembreHasCampagneEntity.create(membreHasCampagneData).save();
    return createMembreHasCampagneData;
  }

  /**
   *
   * @returns liste MembreHasCampagne avec pagination by id campagne
   */
  public async findMembreHasCampagneByIdCampagne(idCampagne: number) {
    const list = await MembreHasCampagneEntity.find({ where: { campagne: { idCampagne: idCampagne } } });
    const listeRet = [];
    await list.map(element => {
      const obj = {
        nomPrenom: element.destinateur.nom + element.destinateur.prenom,
        telephone: element.destinateur.telephone,
        email: element.destinateur.email,
        campagne: element.campagne,
      };
      listeRet.push(obj);
    });
    return listeRet;
  }

  /**
   * fonction prendre categorie par id
   * @param membreHasCampagneId
   */
  public async findMembreHasCampagneById(membreHasCampagneId: number) {
    if (isEmpty(membreHasCampagneId)) throw new HttpException(400, "You're not membreHasCampagneId");

    const findCategorie = await MembreHasCampagneEntity.findOne({ where: { id: membreHasCampagneId } });
    if (!findCategorie) throw new HttpException(409, "You're not categorie");

    return findCategorie;
  }
}

export default MembreHasCampagneService;
