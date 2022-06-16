import { InfoSocieteEntity } from '@/entities/info-societe.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import UserService from './user.service';

@EntityRepository()
class InfoSocieteService extends Repository<InfoSocieteEntity> {
  public userService = new UserService();
  /**
   * fonction ajouter InfoSociete
   * @param InfoSociete
   */
  public async createInfoSociete(InfoSocieteData: InfoSocieteEntity) {
    const createInfoSocieteData = await InfoSocieteEntity.create(InfoSocieteData).save();
    return createInfoSocieteData;
  }

  /**
   * function modifier InfoSociete
   * @param InfoSocieteId
   */
  public async updateInfoSociete(InfoSocieteId: number, InfoSocieteData: InfoSocieteEntity) {
    if (isEmpty(InfoSocieteData)) throw new HttpException(400, "You're not InfoSociete");

    const findInfoSociete = await InfoSocieteEntity.findOne({ where: { idInfoSociete: InfoSocieteId } });
    if (!findInfoSociete) throw new HttpException(409, "You're not InfoSociete");

    await InfoSocieteEntity.update(InfoSocieteId, InfoSocieteData);
    const updateInfoSociete = await InfoSocieteEntity.findOne({ where: { idInfoSociete: InfoSocieteId } });
    return updateInfoSociete;
  }

  /**
   * fonction prendre InfoSociete par usersId
   * @param userId
   */
  public async findInfoSocieteByUser(userId: number) {
    if (isEmpty(userId)) throw new HttpException(400, "You're not user");
    // verifier si user
    const user = await this.userService.findUserById(userId);
    if (user) {
      const infoRet = await InfoSocieteEntity.findOne({
        where: { users: { idUser: userId } },
      });
      if (!infoRet) {
        const infoSociete = new InfoSocieteEntity();
        infoSociete.users = user;
        await this.createInfoSociete(infoSociete);
      }
    }
    const infoSociete = await InfoSocieteEntity.findOne({
      where: { users: { idUser: userId } },
    });
    delete infoSociete.users;
    return infoSociete;
  }
}

export default InfoSocieteService;
