import { FormuleReservationEntity } from '@/entities/formule-reservation.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import UserService from './user.service';

@EntityRepository()
class FormuleReservationService extends Repository<FormuleReservationEntity> {
  public userService = new UserService();
  /**
   * fonction ajouter FormuleReservation
   * @param FormuleReservation
   */
  public async createFormuleReservation(formuleReservationData: FormuleReservationEntity) {
    const createFormuleReservationData = await FormuleReservationEntity.create(formuleReservationData).save();
    return createFormuleReservationData;
  }

  /**
   * function modifier FormuleReservation
   * @param formuleReservationId
   */
  public async updateFormuleReservation(formuleReservationId: number, FormuleReservationData: FormuleReservationEntity) {
    if (isEmpty(FormuleReservationData)) throw new HttpException(400, "You're not FormuleReservation");

    const findFormuleReservation = await FormuleReservationEntity.findOne({ where: { idFormuleReservation: formuleReservationId } });
    if (!findFormuleReservation) throw new HttpException(409, "You're not FormuleReservation");

    await FormuleReservationEntity.update(formuleReservationId, FormuleReservationData);
    const updateFormuleReservation = await FormuleReservationEntity.findOne({ where: { idFormuleReservation: formuleReservationId } });
    return updateFormuleReservation;
  }

  /**
   * fonction prendre FormuleReservation par usersId
   * @param userId
   */
  public async findFormuleReservationByUser(userId: number) {
    if (isEmpty(userId)) throw new HttpException(400, "You're not user");
    // verifier si user
    const user = await this.userService.findUserById(userId);
    if (user) {
      const infoRet = await FormuleReservationEntity.findOne({
        where: { users: { idUser: userId } },
      });
      if (!infoRet) {
        const FormuleReservation = new FormuleReservationEntity();
        FormuleReservation.users = user;
        await this.createFormuleReservation(FormuleReservation);
      }
    }
    const FormuleReservation = await FormuleReservationEntity.findOne({
      where: { users: { idUser: userId } },
    });
    delete FormuleReservation.users;
    return FormuleReservation;
  }
}

export default FormuleReservationService;
