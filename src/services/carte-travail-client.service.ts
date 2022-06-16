import { CarteTravailClientEntity, StatusCarteTravail } from '@/entities/carte-travail-client.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class CarteTravailClientService extends Repository<CarteTravailClientEntity> {
  /**
   * fonction lister tous les CarteTravailClients du client
   */
  public async findAllCarteTravailClientByIdClient(clientid: number) {
    const carteTravailClients = await CarteTravailClientEntity.find({
      relations: ['projets'],
      where: { projets: { vehicules: { clients: { idClient: clientid } } } },
    });
    return carteTravailClients;
  }

  /**
   * fonction prendre CarteTravailClient par id
   * @param carteTravailClientId
   */
  public async findCarteTravailClientById(carteTravailClientId: number) {
    if (isEmpty(carteTravailClientId)) throw new HttpException(400, "You're not carteTravailClientId");

    const findCarteTravailClient = await CarteTravailClientEntity.findOne({ where: { idCarteTravailClient: carteTravailClientId } });

    findCarteTravailClient.rapportCorporel = JSON.parse(findCarteTravailClient.rapportCorporel);
    findCarteTravailClient.rapportElectrique = JSON.parse(findCarteTravailClient.rapportElectrique);
    findCarteTravailClient.rapportMecanique = JSON.parse(findCarteTravailClient.rapportMecanique);
    if (!findCarteTravailClient) throw new HttpException(409, "You're not CarteTravailClient");

    return findCarteTravailClient;
  }

  /**
   * fonction supprimer CarteTravailClient
   * @param carteTravailClientId
   */
  public async deleteCarteTravailClient(carteTravailClientId: number) {
    if (isEmpty(carteTravailClientId)) throw new HttpException(400, "You're not carteTravailClientId");

    const findCarteTravailClient = await CarteTravailClientEntity.findOne({ where: { idCarteTravailClient: carteTravailClientId } });
    if (!findCarteTravailClient) throw new HttpException(409, "You're not CarteTravailClient");

    await CarteTravailClientEntity.delete({ idCarteTravailClient: carteTravailClientId });
    return findCarteTravailClient;
  }

  /**
   * fonction ajouter CarteTravailClient
   * @param CarteTravailClientEntity
   */
  public async createCarteTravailClient(carteTravailClientData: CarteTravailClientEntity) {
    if (carteTravailClientData.satus) carteTravailClientData.satus = StatusCarteTravail[carteTravailClientData.satus];
    const createCarteTravailClientData = await CarteTravailClientEntity.create(carteTravailClientData).save();
    return createCarteTravailClientData;
  }

  /**
   * function modifier CarteTravailClient
   * @param carteTravailClientId
   * @param CarteTravailClientEntity
   */
  public async updateCarteTravailClient(carteTravailClientId: number, carteTravailClientData: CarteTravailClientEntity) {
    if (isEmpty(carteTravailClientData)) throw new HttpException(400, "You're not carteTravailClientData");

    const findCarteTravailClient = await CarteTravailClientEntity.findOne({ where: { idCarteTravailClient: carteTravailClientId } });
    if (!findCarteTravailClient) throw new HttpException(409, "You're not CarteTravailClient");

    if (carteTravailClientData.satus) carteTravailClientData.satus = StatusCarteTravail[carteTravailClientData.satus];
    await CarteTravailClientEntity.update(carteTravailClientId, carteTravailClientData);

    const updateCarteTravailClient = await CarteTravailClientEntity.findOne({ where: { idCarteTravailClient: carteTravailClientId } });
    return updateCarteTravailClient;
  }
}

export default CarteTravailClientService;
