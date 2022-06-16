import { MembreEntity, RoleMembre, StatusMembre, TaperMembre } from '@/entities/membre.entity';
import { InputPagination } from '@/entities/pagination';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, In, Repository } from 'typeorm';
import EmailService from './email.service';
import PaginationService from './pagination.service';
import RefreshTokenService from './refresh-token.service';

@EntityRepository()
class MembreService extends Repository<MembreEntity> {
  // public uploadFile = new UploadFile();
  public paginationService = new PaginationService();

  /**
   * appel des service utiliser
   */
  public refreshTokenService = new RefreshTokenService();
  public emailService = new EmailService();

  /**
   *
   * @returns liste Membre
   */
  public async findAllMembre() {
    const Membres = await MembreEntity.find();
    return Membres;
  }

  /**
   *
   * @param membreId
   * @returns get Membre by id
   */
  public async findMembreById(membreId: number) {
    if (isEmpty(membreId)) throw new HttpException(400, "You're not membreId");

    const findMembre = await MembreEntity.findOne({ where: { idMembre: membreId } });
    if (!findMembre) throw new HttpException(409, "You're not Membre");

    return findMembre;
  }

  /**
   *
   * @param membreData
   * @returns creation Membre
   */
  public async createMembre(membreData: MembreEntity) {
    if (isEmpty(membreData)) throw new HttpException(400, "You're not membreData");
    //get enum
    if (membreData.role) membreData.role = RoleMembre[membreData.role];
    if (membreData.statut) membreData.statut = StatusMembre[membreData.statut];
    if (membreData.taper) membreData.taper = TaperMembre[membreData.taper];

    //verifier email
    const findMembre = await this.getMembreByEmail(membreData.email);
    if (findMembre) throw new HttpException(409, `You're email ${membreData.email} already exists`);

    const createMembreData = await MembreEntity.create(membreData).save();
    return createMembreData;
  }

  /**
   *
   * @param membreId
   * @param membreData
   * @returns modifier Membre
   */
  public async updateMembre(membreId: number, membreData: any) {
    if (isEmpty(membreData)) throw new HttpException(400, "You're not membreData");

    const findMembre = await MembreEntity.findOne({ where: { idMembre: membreId } });
    if (!findMembre) throw new HttpException(409, "You're not Membre");
    //get enum
    if (membreData.role) membreData.role = RoleMembre[membreData.role];
    if (membreData.statut) membreData.statut = StatusMembre[membreData.statut];
    if (membreData.taper) membreData.taper = TaperMembre[membreData.taper];
    await MembreEntity.update(membreId, membreData);

    const updateMembre = await MembreEntity.findOne({ where: { idMembre: membreId } });
    return updateMembre;
  }

  /**
   *
   * @param membreId
   * @returns supprimer Membres
   */
  public async deleteMembre(membreId: number) {
    if (isEmpty(membreId)) throw new HttpException(400, "You're not membreId");

    const findMembre = await MembreEntity.findOne({ where: { idMembre: membreId } });
    if (!findMembre) throw new HttpException(409, "You're not Membre");

    await MembreEntity.delete({ idMembre: membreId });
    return findMembre;
  }

  /**
   * get Membre by email
   * @param email
   */
  public async getMembreByEmail(email: string) {
    const findMembre = await MembreEntity.findOne({ where: { email: email } });
    return findMembre;
  }

  /**
   * get Membres by role
   * @param role
   */
  public async findMembreByRole(role: string) {
    const findMembres = await MembreEntity.find({ where: { role: role } });
    return findMembres;
  }

  /**
   *
   * @returns liste Membre avec pagination
   */
  public async findMembrePaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [Membres, count] = await MembreEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(Membres, count, inputPagination);
    return page;
  }

  /**
   * fonction lister tous les membres by ids
   */
  public async findAllMembresByIds(idmembres) {
    const membres = await MembreEntity.find({ where: { idMembre: In(idmembres) } });
    return membres;
  }
}

export default MembreService;
