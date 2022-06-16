import { ClientHasCampagneEntity } from '@/entities/client-has-campagne.entity';
import { PersonneHasCampagneEntity } from '@/entities/personne-has-campagne.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class ClientHasCampagneService extends Repository<ClientHasCampagneEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction supprimer ClientHasCampagne
   * @param clientHasCampagneId
   */
  public async deleteClientHasCampagne(clientHasCampagneId: number) {
    if (isEmpty(clientHasCampagneId)) throw new HttpException(400, "You're not clientHasCampagneId");

    const findClientHasCampagne = await ClientHasCampagneEntity.findOne({ where: { id: clientHasCampagneId } });
    if (!findClientHasCampagne) throw new HttpException(409, "You're not ClientHasCampagne");

    await ClientHasCampagneEntity.delete({ id: clientHasCampagneId });
    return findClientHasCampagne;
  }

  /**
   * fonction ajouter ClientHasCampagne
   * @param ClientHasCampagneEntity
   */
  public async createClientHasCampagne(clientHasCampagneData: ClientHasCampagneEntity) {
    const createClientHasCampagneData = await ClientHasCampagneEntity.create(clientHasCampagneData).save();
    return createClientHasCampagneData;
  }

  /**
   *
   * @returns liste ClientHasCampagne avec pagination by id campagne
   */
  public async findClientHasCampagneByIdCampagne(idCampagne: number) {
    const list = await ClientHasCampagneEntity.find({ where: { campagne: { idCampagne: idCampagne } } });
    const listeRet = [];
    await list.map(element => {
      const obj = {
        nomPrenom: element.destinateur.nomPrenom,
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
   * @param clientHasCampagneId
   */
  public async findClientHasCampagneById(clientHasCampagneId: number) {
    if (isEmpty(clientHasCampagneId)) throw new HttpException(400, "You're not clientHasCampagneId");

    const findCategorie = await ClientHasCampagneEntity.findOne({ where: { id: clientHasCampagneId } });
    if (!findCategorie) throw new HttpException(409, "You're not categorie");

    return findCategorie;
  }

  /**
   * fonction ajouter PersonneHasCampagne
   * @param PersonneHasCampagneEntity
   */
  public async createPersonneHasCampagne(personneHasCampagneData: PersonneHasCampagneEntity) {
    const createPersonneHasCampagneData = await PersonneHasCampagneEntity.create(personneHasCampagneData).save();
    return createPersonneHasCampagneData;
  }

  /**
   *
   * @returns liste PersonneHasCampagne avec pagination by id campagne
   */
  public async findPersonneHasCampagneByIdCampagne(idCampagne: number) {
    const list = await PersonneHasCampagneEntity.find({ where: { campagne: { idCampagne: idCampagne } } });
    const listeRet = [];
    await list.map(element => {
      const obj = {
        nomPrenom: '',
        telephone: element.telephone,
        email: '',
        campagne: element.campagne,
      };
      listeRet.push(obj);
    });
    return listeRet;
  }
}

export default ClientHasCampagneService;
