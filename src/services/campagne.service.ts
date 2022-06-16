import { CampagneEntity, StatusCampagne, typeDest } from '@/entities/campagne.entity';
import { ClientHasCampagneEntity } from '@/entities/client-has-campagne.entity';
import { ClientEntity } from '@/entities/client.entity';
import { MembreHasCampagneEntity } from '@/entities/membre-has-campagne.entity';
import { MembreEntity } from '@/entities/membre.entity';
import { InputPagination } from '@/entities/pagination';
import { PersonneHasCampagneEntity } from '@/entities/personne-has-campagne.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import ClientHasCampagneService from './client-has-campagne.service';
import ClientService from './client.service';
import MembreHasCampagneService from './membre-has-campagne.service';
import MembreService from './membre.service';
import PaginationService from './pagination.service';
import SmsService from './sms.service';

@EntityRepository()
class CampagneService extends Repository<CampagneEntity> {
  public paginationService = new PaginationService();

  public membreHasCampagneService = new MembreHasCampagneService();

  public clientHasCampagneService = new ClientHasCampagneService();

  public membreService = new MembreService();

  public clientService = new ClientService();

  public smsService = new SmsService();

  /**
   * fonction lister tous les Campagne
   */
  public async findAllCampagne() {
    const campagnes = await CampagneEntity.find();
    return campagnes;
  }

  /**
   * fonction prendre Campagne par id
   * @param campagneId
   */
  public async findCampagneById(campagneId: number) {
    if (isEmpty(campagneId)) throw new HttpException(400, "You're not campagneId");

    const findCampagne = await CampagneEntity.findOne({ where: { idCampagne: campagneId } });
    if (!findCampagne) throw new HttpException(409, "You're not Campagne");

    return findCampagne;
  }

  /**
   * fonction supprimer Campagne
   * @param campagneId
   */
  public async deleteCampagne(campagneId: number) {
    if (isEmpty(campagneId)) throw new HttpException(400, "You're not campagneId");

    const findCampagne = await CampagneEntity.findOne({ where: { idCampagne: campagneId } });
    if (!findCampagne) throw new HttpException(409, "You're not Campagne");

    await CampagneEntity.delete({ idCampagne: campagneId });
    return findCampagne;
  }

  /**
   * fonction ajouter Campagne
   * @param Campagne
   */
  public async createCampagne(CampagneData: CampagneEntity) {
    CampagneData.sendTo = typeDest[CampagneData.sendTo];
    if (CampagneData.satus) CampagneData.satus = StatusCampagne[CampagneData.satus];
    const createCampagneData = await CampagneEntity.create(CampagneData).save();
    await this.sendcampagneToDestinatuer(createCampagneData.idCampagne);
    return createCampagneData;
  }

  /**
   *
   * @returns liste Campagne avec pagination
   */
  public async findCampagnePaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [users, count] = await CampagneEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(users, count, inputPagination);
    return page;
  }

  /**
   * get all destinateur message
   */
  public async sendcampagneToDestinatuer(idCompagme: number) {
    const campagne = await this.findCampagneById(idCompagme);
    if (campagne.personSelected) {
      const listIdDestinateur = JSON.parse(campagne.personSelected);
      if (campagne.sendTo == typeDest.selectMembre) {
        // send all membre destinateur
        const listMembres = await this.membreService.findAllMembresByIds(listIdDestinateur);
        await this.sendMessageMembres(listMembres, campagne);
      } else {
        // send all client destinateur
        const listclient = await this.clientService.findAllClientByIds(listIdDestinateur);
        await this.sendMessageClient(listclient, campagne);
      }
    } else {
      if (campagne.sendTo == typeDest.tousMembre) {
        // send all membre destinateur
        const listMembres = await this.membreService.findAllMembre();
        await this.sendMessageMembres(listMembres, campagne);
      } else if (campagne.sendTo == typeDest.manuellement) {
        // send all Manually destinateur
        await this.sendMessageManually(campagne);
      } else {
        // send all client destinateur
        const listclient = await this.clientService.findAllClient();
        await this.sendMessageClient(listclient, campagne);
      }
    }
  }

  /**
   * send message membre
   */
  public async sendMessageMembres(listMembres: MembreEntity[], campagne: CampagneEntity) {
    for (const membre of listMembres) {
      const membreHasCampagne = new MembreHasCampagneEntity();
      membreHasCampagne.campagne = campagne;
      membreHasCampagne.destinateur = membre;
      await this.membreHasCampagneService.createMembreHasCampagne(membreHasCampagne);
      // await this.smsService.sendSms(membre.telephone, campagne.message);
    }
  }

  /**
   * send message client
   */
  public async sendMessageClient(listClients: ClientEntity[], campagne: CampagneEntity) {
    for (const client of listClients) {
      const clientHasCampagne = new ClientHasCampagneEntity();
      clientHasCampagne.campagne = campagne;
      clientHasCampagne.destinateur = client;
      return await this.clientHasCampagneService.createClientHasCampagne(clientHasCampagne);
      // await this.smsService.sendSms(client.telephone, campagne.message);
    }
  }

  /**
   * send message Manually
   */
  public async sendMessageManually(campagne: CampagneEntity) {
    const personneHasCampagne = new PersonneHasCampagneEntity();
    personneHasCampagne.telephone = campagne.telephone;
    personneHasCampagne.campagne = campagne;
    await this.clientHasCampagneService.createPersonneHasCampagne(personneHasCampagne);
    // await this.smsService.sendSms(campagne.telephone, campagne.message);
  }

  /**
   * get all Campaign recipients by id campagne
   */
  public async getAllCampaignRecipientsByIdCampagne(idCampagne: number) {
    const listClientHasCampagne = await this.clientHasCampagneService.findClientHasCampagneByIdCampagne(idCampagne);
    const listMembreHasCamapagne = await this.membreHasCampagneService.findMembreHasCampagneByIdCampagne(idCampagne);
    const listePersonneHasCampagne = await this.clientHasCampagneService.findPersonneHasCampagneByIdCampagne(idCampagne);
    const allList = [...listClientHasCampagne, ...listMembreHasCamapagne, ...listePersonneHasCampagne];
    return allList;
  }

  /**
   * send sms client
   * @param data(idClient, message)
   */
  public async sendSmsClient(data: any) {
    const client = await this.clientService.findClientById(data.idClient);
    const campagne = new CampagneEntity();
    campagne.message = data.message;
    campagne.sendTo = typeDest.selectClient;
    campagne.personSelected = JSON.stringify([client.idClient]);
    campagne.satus = StatusCampagne.complete;
    const listClient = [client];
    return await this.sendMessageClient(listClient, campagne);
  }
}

export default CampagneService;
