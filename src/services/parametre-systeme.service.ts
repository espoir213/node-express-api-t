import { ParametreSystemeEntity } from '@/entities/parametre-systeme.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import UserService from './user.service';

@EntityRepository()
class ParametreSystemeService extends Repository<ParametreSystemeEntity> {
  public userService = new UserService();
  /**
   * fonction ajouter ParametreSysteme
   * @param ParametreSysteme
   */
  public async createParametreSysteme(ParametreSystemeData: ParametreSystemeEntity) {
    const createParametreSystemeData = await ParametreSystemeEntity.create(ParametreSystemeData).save();
    return createParametreSystemeData;
  }

  /**
   * function modifier ParametreSysteme
   * @param ParametreSystemeId
   */
  public async updateParametreSysteme(ParametreSystemeId: number, ParametreSystemeData: ParametreSystemeEntity) {
    if (isEmpty(ParametreSystemeData)) throw new HttpException(400, "You're not ParametreSysteme");

    const findParametreSysteme = await ParametreSystemeEntity.findOne({ where: { idParametreSysteme: ParametreSystemeId } });
    if (!findParametreSysteme) throw new HttpException(409, "You're not ParametreSysteme");

    await ParametreSystemeEntity.update(ParametreSystemeId, ParametreSystemeData);
    const updateParametreSysteme = await ParametreSystemeEntity.findOne({ where: { idParametreSysteme: ParametreSystemeId } });
    return updateParametreSysteme;
  }

  /**
   * fonction prendre ParametreSysteme par usersId
   * @param userId
   */
  public async findParametreSystemeByUser(userId: number) {
    if (isEmpty(userId)) throw new HttpException(400, "You're not user");
    // verifier si user
    const user = await this.userService.findUserById(userId);
    if (user) {
      const infoRet = await ParametreSystemeEntity.findOne({
        where: { users: { idUser: userId } },
      });
      if (!infoRet) {
        const ParametreSysteme = new ParametreSystemeEntity();
        ParametreSysteme.users = user;
        await this.createParametreSysteme(ParametreSysteme);
      }
    }
    const ParametreSysteme = await ParametreSystemeEntity.findOne({
      where: { users: { idUser: userId } },
    });
    delete ParametreSysteme.users;
    return ParametreSysteme;
  }
}

export default ParametreSystemeService;
