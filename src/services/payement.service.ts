import { FactureEntity, StatusFacture } from '@/entities/facture.entity';
import { InputPagination } from '@/entities/pagination';
import { PayementEntity } from '@/entities/payement.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import FactureService from './facture.service';
import PaginationService from './pagination.service';

@EntityRepository()
class PayementService extends Repository<PayementEntity> {
  public paginationService = new PaginationService();
  public factureService = new FactureService();
  /**
   * fonction lister tous les Payements
   */
  public async findAllPayement() {
    const payements = await PayementEntity.find();
    return payements;
  }

  /**
   * fonction prendre Payement par id
   * @param payementId
   */
  public async findPayementById(payementId: number) {
    if (isEmpty(payementId)) throw new HttpException(400, "You're not payementId");

    const findPayement = await PayementEntity.findOne({ where: { idPayement: payementId } });
    if (!findPayement) throw new HttpException(409, "You're not Payement");

    return findPayement;
  }

  /**
   * fonction supprimer Payement
   * @param payementId
   */
  public async deletePayement(payementId: number) {
    if (isEmpty(payementId)) throw new HttpException(400, "You're not payementId");

    const findPayement = await PayementEntity.findOne({ where: { idPayement: payementId } });
    if (!findPayement) throw new HttpException(409, "You're not Payement");

    await this.updateFacture(findPayement.factures.idFacture, findPayement.montant, 2, 0);
    await PayementEntity.delete({ idPayement: payementId });
    return findPayement;
  }

  /**
   * fonction ajouter Payement
   * @param PayementEntity
   */
  public async createPayement(payementData: PayementEntity) {
    const createPayementData = await PayementEntity.create(payementData).save();
    if (createPayementData) await this.updateFacture(payementData.factures, payementData.montant, 0, 0);
    return createPayementData;
  }

  /**
   * function modifier Payement
   * @param payementId
   * @param PayementEntity
   */
  public async updatePayement(payementId: number, payementData: PayementEntity) {
    if (isEmpty(payementData)) throw new HttpException(400, "You're not PayementData");

    const findPayement = await PayementEntity.findOne({ where: { idPayement: payementId } });
    if (!findPayement) throw new HttpException(409, "You're not Payement");

    if (payementData.montant) await this.updateFacture(findPayement.factures.idFacture, findPayement.montant, 1, payementData.montant);

    await PayementEntity.update(payementId, payementData);

    const updatePayement = await PayementEntity.findOne({ where: { idPayement: payementId } });
    return updatePayement;
  }

  /**
   *
   * @returns liste Payement avec pagination
   */
  public async findPayementPaginate(inputPagination: InputPagination) {
    const skipe = (inputPagination.page - 1) * inputPagination.pageSize;
    const [users, count] = await PayementEntity.findAndCount({ skip: skipe, take: inputPagination.pageSize });
    const page = this.paginationService.paginationEntity(users, count, inputPagination);
    return page;
  }

  /**
   *
   * @param factureId
   * @param montantPayement
   * @param type 0: ajout, 1: modifier, 2: supprimer
   * @param newMontantPayement modification
   * @returns
   */
  public async updateFacture(factureId, montantPayement, type, newMontantPayement) {
    const facture = await FactureEntity.findOne(factureId);
    if (type === 0) {
      //calcul restePayer ajout payement
      facture.restePayer = Number(facture.restePayer) - Number(montantPayement);
    } else if (type === 1) {
      //calcul restePayer modification payement
      const restPayer = await this.calculeResteFactureEdditPayement(facture, montantPayement, newMontantPayement);
      facture.restePayer = Number(facture.total) - Number(restPayer);
    } else {
      //calcul restePayer suppression payement
      const restPayer = await this.getAllSumMontantByFactureId(facture.idFacture);
      facture.restePayer = Number(restPayer) + Number(facture.restePayer);
    }
    facture.status = facture.restePayer == 0 ? StatusFacture.payer : StatusFacture.partiel;
    return await this.factureService.updateFacture(facture.idFacture, facture);
  }

  /**
   * fuction calcule reste payer facture modifier payement
   */
  public async calculeResteFactureEdditPayement(facture: FactureEntity, lastMontantPayement, newMontantPayement) {
    const sumPayement = await this.getAllSumMontantByFactureId(facture.idFacture);
    const restePayer = Number(sumPayement) - Number(lastMontantPayement);
    return restePayer + Number(newMontantPayement);
  }

  /**
   * get all sum montant by id facture
   */
  public async getAllSumMontantByFactureId(factureId) {
    const sumMontant = await PayementEntity.createQueryBuilder('payement')
      .select('sum (payement.montant) as montant')
      .where('payement.factures=:factureId', { factureId: factureId })
      .getRawOne();
    return sumMontant.montant ? sumMontant.montant : 0;
  }
}

export default PayementService;
