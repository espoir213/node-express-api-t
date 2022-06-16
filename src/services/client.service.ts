import { CreateClientDto } from '@/dtos/client.dto';
import { ClientEntity } from '@/entities/client.entity';
import { InputPagination } from '@/entities/pagination';
import { RemarqueClientEntity } from '@/entities/remarque-client.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, In, Repository } from 'typeorm';
import PaginationService from './pagination.service';

@EntityRepository()
class ClientService extends Repository<ClientEntity> {
  public paginationService = new PaginationService();

  /**
   * fonction lister tous les clients
   */
  public async findAllClient() {
    const clients = await ClientEntity.find();
    return clients;
  }

  /**
   * fonction prendre client par id
   * @param clientId
   */
  public async findClientById(clientId: number) {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");
    const findClient: any = await ClientEntity.findOne({ relations: ['remarques'], where: { idClient: clientId } });
    findClient.remarques = await findClient.remarques.map(({ clients, ...item }) => item);
    return findClient;
  }

  /**
   * fonction supprimer client
   * @param clientId
   */
  public async deleteClient(clientId: number) {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");

    const findClient = await ClientEntity.findOne({ where: { idClient: clientId } });
    if (!findClient) throw new HttpException(409, "You're not Client");

    await ClientEntity.delete({ idClient: clientId });
    return findClient;
  }

  /**
   * fonction ajouter client
   * @param CreateClientDto
   */
  public async createClient(clientData: CreateClientDto) {
    const client = await this.getClientByEmail(clientData.email);
    if (client) throw new HttpException(409, `You're email ${clientData.email} already exists`);
    const createClientData = await ClientEntity.create(clientData).save();
    return createClientData;
  }

  /**
   * function modifier client
   * @param clientId
   * @param CreateClientDto
   */
  public async updateClient(clientId: number, clientData: ClientEntity) {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient = await ClientEntity.findOne({ where: { idClient: clientId } });
    if (!findClient) throw new HttpException(409, "You're not client");

    await ClientEntity.update(clientId, clientData);
    const updateClient = await ClientEntity.findOne({ where: { idClient: clientId } });
    return updateClient;
  }

  /**
   * function get client by email
   * @param email
   */
  public async getClientByEmail(email: String) {
    const findClient = await ClientEntity.findOne({ where: { email: email } });
    return findClient;
  }

  /**
   *
   * @returns liste Client avec pagination
   */
  public async findClientPaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [users, count] = await ClientEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(users, count, inputPagination);
    return page;
  }

  /**
   * fonction lister tous les clients by ids
   */
  public async findAllClientByIds(idClients) {
    const clients = await ClientEntity.find({ where: { idClient: In(idClients) } });
    return clients;
  }

  /**
   * fonction ajouter remarque client
   * @param RemarqueClientEntity
   */
  public async createRemarqueClient(remarqueClientData: RemarqueClientEntity) {
    const createRemarqueClientData = await RemarqueClientEntity.create(remarqueClientData).save();
    return createRemarqueClientData;
  }

  /**
   * fonction supprimer remarque client
   * @param idRemaque
   */
  public async deleteRemarqueClient(idRemaque: number) {
    if (isEmpty(idRemaque)) throw new HttpException(400, "You're not idRemaque");

    const findRemarqueClient = await RemarqueClientEntity.findOne({ where: { idRemarque: idRemaque } });
    if (!findRemarqueClient) throw new HttpException(409, "You're not Client");

    await RemarqueClientEntity.delete({ idRemarque: idRemaque });
    return findRemarqueClient;
  }
}

export default ClientService;
